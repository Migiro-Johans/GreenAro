const pool = require('../config/database');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const fs = require('fs').promises;
const path = require('path');

/**
 * Add a new leadership member
 * @route POST /api/leadership
 * @access Admin
 */
exports.addLeader = async (req, res, next) => {
  try {
    const { name, position, bio, display_order = 0, is_active = 1 } = req.body;
    const image_url = req.file ? `/uploads/leadership/${req.file.filename}` : null;

    if (!name || !position) {
      return res.status(400).json(errorResponse('Name and position are required'));
    }

    const query = `
      INSERT INTO leadership (name, position, bio, image_url, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      name,
      position,
      bio || null,
      image_url,
      display_order,
      is_active
    ]);

    logger.info(`New leader added: ${name} (ID: ${result.insertId})`);

    res.status(201).json(successResponse({
      id: result.insertId,
      name,
      position,
      bio,
      image_url,
      display_order,
      is_active
    }, 'Leader added successfully'));

  } catch (error) {
    logger.error(`Error adding leader: ${error.message}`);
    next(error);
  }
};

/**
 * Get all leadership members
 * @route GET /api/leadership
 * @access Public
 */
exports.getAllLeaders = async (req, res, next) => {
  try {
    const { active_only = 'true' } = req.query;
    
    let query = 'SELECT * FROM leadership';
    const params = [];

    if (active_only === 'true') {
      query += ' WHERE is_active = 1';
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const [leaders] = await pool.execute(query, params);

    res.json(successResponse(leaders, 'Leaders retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching leaders: ${error.message}`);
    next(error);
  }
};

/**
 * Get a single leadership member by ID
 * @route GET /api/leadership/:id
 * @access Public
 */
exports.getLeaderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [leaders] = await pool.execute(
      'SELECT * FROM leadership WHERE id = ?',
      [id]
    );

    if (leaders.length === 0) {
      return res.status(404).json(errorResponse('Leader not found'));
    }

    res.json(successResponse(leaders[0], 'Leader retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching leader: ${error.message}`);
    next(error);
  }
};

/**
 * Update a leadership member
 * @route PUT /api/leadership/:id
 * @access Admin
 */
exports.updateLeader = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, bio, display_order, is_active } = req.body;

    // Check if leader exists
    const [existing] = await pool.execute(
      'SELECT * FROM leadership WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Leader not found'));
    }

    const oldImageUrl = existing[0].image_url;

    // Prepare update data
    const updates = [];
    const params = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (position !== undefined) {
      updates.push('position = ?');
      params.push(position);
    }
    if (bio !== undefined) {
      updates.push('bio = ?');
      params.push(bio);
    }
    if (display_order !== undefined) {
      updates.push('display_order = ?');
      params.push(display_order);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active);
    }

    // Handle image upload
    if (req.file) {
      const new_image_url = `/uploads/leadership/${req.file.filename}`;
      updates.push('image_url = ?');
      params.push(new_image_url);

      // Delete old image if exists
      if (oldImageUrl) {
        const oldImagePath = path.join(__dirname, '..', oldImageUrl);
        try {
          await fs.unlink(oldImagePath);
          logger.info(`Deleted old image: ${oldImagePath}`);
        } catch (err) {
          logger.warn(`Failed to delete old image: ${err.message}`);
        }
      }
    }

    if (updates.length === 0) {
      return res.status(400).json(errorResponse('No fields to update'));
    }

    params.push(id);
    const query = `UPDATE leadership SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    await pool.execute(query, params);

    // Fetch updated leader
    const [updated] = await pool.execute('SELECT * FROM leadership WHERE id = ?', [id]);

    logger.info(`Leader updated: ${id}`);

    res.json(successResponse(updated[0], 'Leader updated successfully'));

  } catch (error) {
    logger.error(`Error updating leader: ${error.message}`);
    next(error);
  }
};

/**
 * Delete a leadership member
 * @route DELETE /api/leadership/:id
 * @access Super Admin
 */
exports.deleteLeader = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if leader exists
    const [existing] = await pool.execute(
      'SELECT * FROM leadership WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Leader not found'));
    }

    const imageUrl = existing[0].image_url;

    // Delete from database
    await pool.execute('DELETE FROM leadership WHERE id = ?', [id]);

    // Delete image file if exists
    if (imageUrl) {
      const imagePath = path.join(__dirname, '..', imageUrl);
      try {
        await fs.unlink(imagePath);
        logger.info(`Deleted image file: ${imagePath}`);
      } catch (err) {
        logger.warn(`Failed to delete image file: ${err.message}`);
      }
    }

    logger.info(`Leader deleted: ${id}`);

    res.json(successResponse(null, 'Leader deleted successfully'));

  } catch (error) {
    logger.error(`Error deleting leader: ${error.message}`);
    next(error);
  }
};
