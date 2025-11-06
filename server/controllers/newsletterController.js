const pool = require('../config/database');
const logger = require('../utils/logger');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const crypto = require('crypto');

/**
 * Subscribe to newsletter
 * @route POST /api/newsletter/subscribe
 * @access Public
 */
exports.subscribe = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json(errorResponse('Email is required'));
    }

    // Check if already subscribed
    const [existing] = await pool.execute(
      'SELECT * FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      if (existing[0].status === 'active') {
        return res.status(400).json(errorResponse('Email is already subscribed'));
      } else if (existing[0].status === 'unsubscribed') {
        // Resubscribe
        await pool.execute(
          'UPDATE newsletter_subscribers SET status = "active", name = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
          [name || existing[0].name, email]
        );

        logger.info(`Resubscribed to newsletter: ${email}`);
        return res.json(successResponse(null, 'Successfully resubscribed to newsletter'));
      }
    }

    // Generate unsubscribe token
    const unsubscribe_token = crypto.randomBytes(32).toString('hex');

    const query = `
      INSERT INTO newsletter_subscribers (email, name, unsubscribe_token, status)
      VALUES (?, ?, ?, 'active')
    `;

    const [result] = await pool.execute(query, [email, name || null, unsubscribe_token]);

    logger.info(`New newsletter subscription: ${email}`);

    res.status(201).json(successResponse({
      id: result.insertId,
      email,
      message: 'Successfully subscribed to newsletter'
    }, 'Newsletter subscription successful'));

  } catch (error) {
    logger.error(`Newsletter subscription error: ${error.message}`);
    next(error);
  }
};

/**
 * Unsubscribe from newsletter
 * @route POST /api/newsletter/unsubscribe
 * @access Public
 */
exports.unsubscribe = async (req, res, next) => {
  try {
    const { email, token } = req.body;

    if (!email) {
      return res.status(400).json(errorResponse('Email is required'));
    }

    let query = 'SELECT * FROM newsletter_subscribers WHERE email = ?';
    const params = [email];

    if (token) {
      query += ' AND unsubscribe_token = ?';
      params.push(token);
    }

    const [subscribers] = await pool.execute(query, params);

    if (subscribers.length === 0) {
      return res.status(404).json(errorResponse('Subscription not found'));
    }

    await pool.execute(
      'UPDATE newsletter_subscribers SET status = "unsubscribed", updated_at = CURRENT_TIMESTAMP WHERE email = ?',
      [email]
    );

    logger.info(`Unsubscribed from newsletter: ${email}`);

    res.json(successResponse(null, 'Successfully unsubscribed from newsletter'));

  } catch (error) {
    logger.error(`Newsletter unsubscribe error: ${error.message}`);
    next(error);
  }
};

/**
 * Get all newsletter subscribers (Admin)
 * @route GET /api/newsletter/subscribers
 * @access Admin
 */
exports.getAllSubscribers = async (req, res, next) => {
  try {
    const { status = 'active', page = 1, limit = 50, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM newsletter_subscribers WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (email LIKE ? OR name LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [subscribers] = await pool.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM newsletter_subscribers WHERE 1=1';
    const countParams = [];

    if (status && status !== 'all') {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (search) {
      countQuery += ' AND (email LIKE ? OR name LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json(paginatedResponse(
      subscribers,
      parseInt(page),
      parseInt(limit),
      total,
      'Subscribers retrieved successfully'
    ));

  } catch (error) {
    logger.error(`Error fetching newsletter subscribers: ${error.message}`);
    next(error);
  }
};

/**
 * Export subscribers (Admin)
 * @route GET /api/newsletter/export
 * @access Admin
 */
exports.exportSubscribers = async (req, res, next) => {
  try {
    const { status = 'active' } = req.query;

    let query = 'SELECT email, name, status, created_at FROM newsletter_subscribers';
    const params = [];

    if (status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [subscribers] = await pool.execute(query, params);

    // Convert to CSV
    const csvHeaders = 'Email,Name,Status,Subscribed Date\n';
    const csvRows = subscribers.map(sub => 
      `${sub.email},"${sub.name || ''}",${sub.status},${sub.created_at}`
    ).join('\n');

    const csv = csvHeaders + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="subscribers_${Date.now()}.csv"`);
    res.send(csv);

    logger.info(`Exported ${subscribers.length} newsletter subscribers`);

  } catch (error) {
    logger.error(`Error exporting subscribers: ${error.message}`);
    next(error);
  }
};

/**
 * Delete subscriber (Admin)
 * @route DELETE /api/newsletter/subscribers/:id
 * @access Super Admin
 */
exports.deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if subscriber exists
    const [existing] = await pool.execute(
      'SELECT * FROM newsletter_subscribers WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Subscriber not found'));
    }

    await pool.execute('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);

    logger.info(`Newsletter subscriber deleted: ${id}`);

    res.json(successResponse(null, 'Subscriber deleted successfully'));

  } catch (error) {
    logger.error(`Error deleting subscriber: ${error.message}`);
    next(error);
  }
};

/**
 * Get newsletter statistics (Admin)
 * @route GET /api/newsletter/stats
 * @access Admin
 */
exports.getNewsletterStats = async (req, res, next) => {
  try {
    // Total subscribers
    const [total] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers'
    );

    // Active subscribers
    const [active] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = "active"'
    );

    // Unsubscribed
    const [unsubscribed] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = "unsubscribed"'
    );

    // Recent subscriptions (last 7 days)
    const [recent] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    // Growth trend (last 30 days by week)
    const [growth] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m-%d') as date,
        COUNT(*) as count
      FROM newsletter_subscribers
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')
      ORDER BY date DESC
    `);

    res.json(successResponse({
      total: total[0].count,
      active: active[0].count,
      unsubscribed: unsubscribed[0].count,
      recent_7days: recent[0].count,
      growth_trend: growth
    }, 'Newsletter statistics retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching newsletter stats: ${error.message}`);
    next(error);
  }
};
