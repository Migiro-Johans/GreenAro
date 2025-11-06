const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/responseHelper');

/**
 * Register a new admin user
 * @route POST /api/auth/register
 * @access Super Admin
 */
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, full_name, role = 'admin' } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json(errorResponse('Username, email, and password are required'));
    }

    // Check if user already exists
    const [existing] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json(errorResponse('Username or email already exists'));
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active)
      VALUES (?, ?, ?, ?, ?, 1)
    `;

    const [result] = await pool.execute(query, [
      username,
      email,
      password_hash,
      full_name || null,
      role
    ]);

    logger.info(`New admin user registered: ${username} (${role})`);

    res.status(201).json(successResponse({
      id: result.insertId,
      username,
      email,
      role,
      message: 'Admin user registered successfully'
    }, 'Registration successful'));

  } catch (error) {
    logger.error(`Admin registration error: ${error.message}`);
    next(error);
  }
};

/**
 * Login admin user
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json(errorResponse('Username and password are required'));
    }

    // Find user
    const [users] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    const user = users[0];

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json(errorResponse('Account is inactive. Please contact administrator.'));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      // Update failed attempts
      await pool.execute(
        'UPDATE admin_users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = ?',
        [user.id]
      );

      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Update last login and reset failed attempts
    await pool.execute(
      'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP, failed_login_attempts = 0 WHERE id = ?',
      [user.id]
    );

    logger.info(`Admin user logged in: ${user.username}`);

    // Log activity
    await pool.execute(
      'INSERT INTO activity_logs (admin_id, action, description) VALUES (?, ?, ?)',
      [user.id, 'login', `User ${user.username} logged in`]
    );

    res.json(successResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    }, 'Login successful'));

  } catch (error) {
    logger.error(`Admin login error: ${error.message}`);
    next(error);
  }
};

/**
 * Get current user info
 * @route GET /api/auth/me
 * @access Private
 */
exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [users] = await pool.execute(
      'SELECT id, username, email, full_name, role, is_active, last_login, created_at FROM admin_users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json(errorResponse('User not found'));
    }

    res.json(successResponse(users[0], 'User info retrieved successfully'));

  } catch (error) {
    logger.error(`Error getting current user: ${error.message}`);
    next(error);
  }
};

/**
 * Change password
 * @route PUT /api/auth/change-password
 * @access Private
 */
exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json(errorResponse('Current password and new password are required'));
    }

    if (new_password.length < 8) {
      return res.status(400).json(errorResponse('New password must be at least 8 characters long'));
    }

    // Get user
    const [users] = await pool.execute(
      'SELECT * FROM admin_users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json(errorResponse('User not found'));
    }

    const user = users[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(current_password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Current password is incorrect'));
    }

    // Hash new password
    const new_password_hash = await bcrypt.hash(new_password, 10);

    // Update password
    await pool.execute(
      'UPDATE admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [new_password_hash, userId]
    );

    logger.info(`Password changed for user: ${user.username}`);

    // Log activity
    await pool.execute(
      'INSERT INTO activity_logs (admin_id, action, description) VALUES (?, ?, ?)',
      [userId, 'password_change', 'User changed their password']
    );

    res.json(successResponse(null, 'Password changed successfully'));

  } catch (error) {
    logger.error(`Error changing password: ${error.message}`);
    next(error);
  }
};

/**
 * Update user profile
 * @route PUT /api/auth/profile
 * @access Private
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { full_name, email } = req.body;

    const updates = [];
    const params = [];

    if (full_name !== undefined) {
      updates.push('full_name = ?');
      params.push(full_name);
    }

    if (email !== undefined) {
      // Check if email is already taken by another user
      const [existing] = await pool.execute(
        'SELECT * FROM admin_users WHERE email = ? AND id != ?',
        [email, userId]
      );

      if (existing.length > 0) {
        return res.status(400).json(errorResponse('Email is already taken'));
      }

      updates.push('email = ?');
      params.push(email);
    }

    if (updates.length === 0) {
      return res.status(400).json(errorResponse('No fields to update'));
    }

    params.push(userId);
    const query = `UPDATE admin_users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    await pool.execute(query, params);

    // Fetch updated user
    const [updated] = await pool.execute(
      'SELECT id, username, email, full_name, role FROM admin_users WHERE id = ?',
      [userId]
    );

    logger.info(`Profile updated for user: ${updated[0].username}`);

    res.json(successResponse(updated[0], 'Profile updated successfully'));

  } catch (error) {
    logger.error(`Error updating profile: ${error.message}`);
    next(error);
  }
};

/**
 * Logout (optional - mainly for logging purposes)
 * @route POST /api/auth/logout
 * @access Private
 */
exports.logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;

    // Log activity
    await pool.execute(
      'INSERT INTO activity_logs (admin_id, action, description) VALUES (?, ?, ?)',
      [userId, 'logout', `User ${username} logged out`]
    );

    logger.info(`Admin user logged out: ${username}`);

    res.json(successResponse(null, 'Logout successful'));

  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    next(error);
  }
};
