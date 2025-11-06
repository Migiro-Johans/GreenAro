const pool = require('../config/database');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');

/**
 * Submit contact form (Public)
 * @route POST /api/contact
 * @access Public
 */
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json(errorResponse('Name, email, and message are required'));
    }

    const query = `
      INSERT INTO contact_submissions (name, email, phone, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `;

    const [result] = await pool.execute(query, [
      name,
      email,
      phone || null,
      subject || 'General Inquiry',
      message
    ]);

    // Send confirmation email (async, don't wait)
    emailService.sendContactConfirmation({ name, email }).catch(err => {
      logger.error(`Failed to send confirmation email: ${err.message}`);
    });

    logger.info(`New contact submission: ${name} (${email})`);

    res.status(201).json(successResponse({
      id: result.insertId,
      name,
      email,
      message: 'Your message has been received. We\'ll get back to you soon!'
    }, 'Contact form submitted successfully'));

  } catch (error) {
    logger.error(`Contact submission error: ${error.message}`);
    next(error);
  }
};

/**
 * Get all contact submissions (Admin)
 * @route GET /api/contact
 * @access Admin
 */
exports.getAllSubmissions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM contact_submissions WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [submissions] = await pool.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contact_submissions WHERE 1=1';
    const countParams = [];

    if (status && status !== 'all') {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (search) {
      countQuery += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json(paginatedResponse(
      submissions,
      parseInt(page),
      parseInt(limit),
      total,
      'Contact submissions retrieved successfully'
    ));

  } catch (error) {
    logger.error(`Error fetching contact submissions: ${error.message}`);
    next(error);
  }
};

/**
 * Get single contact submission (Admin)
 * @route GET /api/contact/:id
 * @access Admin
 */
exports.getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [submissions] = await pool.execute(
      'SELECT * FROM contact_submissions WHERE id = ?',
      [id]
    );

    if (submissions.length === 0) {
      return res.status(404).json(errorResponse('Contact submission not found'));
    }

    // Mark as read if not already
    if (!submissions[0].is_read) {
      await pool.execute(
        'UPDATE contact_submissions SET is_read = 1 WHERE id = ?',
        [id]
      );
    }

    res.json(successResponse(submissions[0], 'Contact submission retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching contact submission: ${error.message}`);
    next(error);
  }
};

/**
 * Update contact submission status (Admin)
 * @route PUT /api/contact/:id/status
 * @access Admin
 */
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (!status) {
      return res.status(400).json(errorResponse('Status is required'));
    }

    const validStatuses = ['new', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json(errorResponse('Invalid status value'));
    }

    // Check if submission exists
    const [existing] = await pool.execute(
      'SELECT * FROM contact_submissions WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Contact submission not found'));
    }

    const updates = ['status = ?'];
    const params = [status];

    if (admin_notes !== undefined) {
      updates.push('admin_notes = ?');
      params.push(admin_notes);
    }

    params.push(id);
    const query = `UPDATE contact_submissions SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    await pool.execute(query, params);

    // Fetch updated submission
    const [updated] = await pool.execute('SELECT * FROM contact_submissions WHERE id = ?', [id]);

    logger.info(`Contact submission ${id} status updated to: ${status}`);

    res.json(successResponse(updated[0], 'Status updated successfully'));

  } catch (error) {
    logger.error(`Error updating status: ${error.message}`);
    next(error);
  }
};

/**
 * Delete contact submission (Admin)
 * @route DELETE /api/contact/:id
 * @access Super Admin
 */
exports.deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if submission exists
    const [existing] = await pool.execute(
      'SELECT * FROM contact_submissions WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Contact submission not found'));
    }

    await pool.execute('DELETE FROM contact_submissions WHERE id = ?', [id]);

    logger.info(`Contact submission deleted: ${id}`);

    res.json(successResponse(null, 'Contact submission deleted successfully'));

  } catch (error) {
    logger.error(`Error deleting contact submission: ${error.message}`);
    next(error);
  }
};

/**
 * Get contact statistics (Admin)
 * @route GET /api/contact/stats
 * @access Admin
 */
exports.getContactStats = async (req, res, next) => {
  try {
    // Total submissions
    const [total] = await pool.execute('SELECT COUNT(*) as count FROM contact_submissions');

    // Submissions by status
    const [byStatus] = await pool.execute(
      'SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status'
    );

    // Unread submissions
    const [unread] = await pool.execute(
      'SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = 0'
    );

    // Recent submissions (last 7 days)
    const [recent] = await pool.execute(
      'SELECT COUNT(*) as count FROM contact_submissions WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    res.json(successResponse({
      total: total[0].count,
      unread: unread[0].count,
      recent_7days: recent[0].count,
      by_status: byStatus
    }, 'Contact statistics retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching contact stats: ${error.message}`);
    next(error);
  }
};