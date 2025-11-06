const pool = require('../config/database');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new chat session
 * @route POST /api/chat/sessions
 * @access Public
 */
exports.createSession = async (req, res, next) => {
  try {
    const { visitor_name, visitor_email } = req.body;
    const session_id = uuidv4();

    const query = `
      INSERT INTO chat_sessions (session_id, visitor_name, visitor_email, status)
      VALUES (?, ?, ?, 'active')
    `;

    await pool.execute(query, [
      session_id,
      visitor_name || 'Anonymous',
      visitor_email || null
    ]);

    logger.info(`New chat session created: ${session_id}`);

    res.status(201).json(successResponse({
      session_id,
      visitor_name: visitor_name || 'Anonymous',
      visitor_email,
      status: 'active'
    }, 'Chat session created successfully'));

  } catch (error) {
    logger.error(`Error creating chat session: ${error.message}`);
    next(error);
  }
};

/**
 * Send a message in a chat session
 * @route POST /api/chat/messages
 * @access Public
 */
exports.sendMessage = async (req, res, next) => {
  try {
    const { session_id, message, sender_type = 'visitor' } = req.body;

    if (!session_id || !message) {
      return res.status(400).json(errorResponse('Session ID and message are required'));
    }

    // Check if session exists and is active
    const [sessions] = await pool.execute(
      'SELECT * FROM chat_sessions WHERE session_id = ?',
      [session_id]
    );

    if (sessions.length === 0) {
      return res.status(404).json(errorResponse('Chat session not found'));
    }

    const query = `
      INSERT INTO chat_messages (session_id, message, sender_type)
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.execute(query, [session_id, message, sender_type]);

    logger.info(`Message sent in session ${session_id} by ${sender_type}`);

    res.status(201).json(successResponse({
      id: result.insertId,
      session_id,
      message,
      sender_type,
      timestamp: new Date()
    }, 'Message sent successfully'));

  } catch (error) {
    logger.error(`Error sending message: ${error.message}`);
    next(error);
  }
};

/**
 * Get all chat sessions (admin)
 * @route GET /api/chat/sessions
 * @access Admin
 */
exports.getAllSessions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM chat_sessions';
    const params = [];

    if (status && status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [sessions] = await pool.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM chat_sessions';
    if (status && status !== 'all') {
      countQuery += ' WHERE status = ?';
    }
    const [countResult] = await pool.execute(
      countQuery,
      status && status !== 'all' ? [status] : []
    );

    const total = countResult[0].total;

    res.json(successResponse({
      sessions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Chat sessions retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching chat sessions: ${error.message}`);
    next(error);
  }
};

/**
 * Get messages for a specific session
 * @route GET /api/chat/sessions/:session_id/messages
 * @access Public/Admin
 */
exports.getSessionMessages = async (req, res, next) => {
  try {
    const { session_id } = req.params;

    // Check if session exists
    const [sessions] = await pool.execute(
      'SELECT * FROM chat_sessions WHERE session_id = ?',
      [session_id]
    );

    if (sessions.length === 0) {
      return res.status(404).json(errorResponse('Chat session not found'));
    }

    const [messages] = await pool.execute(
      'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC',
      [session_id]
    );

    res.json(successResponse({
      session: sessions[0],
      messages
    }, 'Messages retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching messages: ${error.message}`);
    next(error);
  }
};

/**
 * End a chat session
 * @route PUT /api/chat/sessions/:session_id/end
 * @access Public/Admin
 */
exports.endSession = async (req, res, next) => {
  try {
    const { session_id } = req.params;

    // Check if session exists
    const [sessions] = await pool.execute(
      'SELECT * FROM chat_sessions WHERE session_id = ?',
      [session_id]
    );

    if (sessions.length === 0) {
      return res.status(404).json(errorResponse('Chat session not found'));
    }

    await pool.execute(
      'UPDATE chat_sessions SET status = ?, ended_at = CURRENT_TIMESTAMP WHERE session_id = ?',
      ['ended', session_id]
    );

    logger.info(`Chat session ended: ${session_id}`);

    res.json(successResponse(null, 'Chat session ended successfully'));

  } catch (error) {
    logger.error(`Error ending session: ${error.message}`);
    next(error);
  }
};

/**
 * Submit feedback for a chat session
 * @route PUT /api/chat/sessions/:session_id/feedback
 * @access Public
 */
exports.submitFeedback = async (req, res, next) => {
  try {
    const { session_id } = req.params;
    const { rating, feedback_comment } = req.body;

    if (!rating) {
      return res.status(400).json(errorResponse('Rating is required'));
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json(errorResponse('Rating must be between 1 and 5'));
    }

    // Check if session exists
    const [sessions] = await pool.execute(
      'SELECT * FROM chat_sessions WHERE session_id = ?',
      [session_id]
    );

    if (sessions.length === 0) {
      return res.status(404).json(errorResponse('Chat session not found'));
    }

    await pool.execute(
      'UPDATE chat_sessions SET rating = ?, feedback_comment = ? WHERE session_id = ?',
      [rating, feedback_comment || null, session_id]
    );

    logger.info(`Feedback submitted for session: ${session_id} (Rating: ${rating})`);

    res.json(successResponse(null, 'Feedback submitted successfully'));

  } catch (error) {
    logger.error(`Error submitting feedback: ${error.message}`);
    next(error);
  }
};

/**
 * Get chat statistics (admin)
 * @route GET /api/chat/stats
 * @access Admin
 */
exports.getChatStats = async (req, res, next) => {
  try {
    // Total sessions
    const [totalSessions] = await pool.execute(
      'SELECT COUNT(*) as total FROM chat_sessions'
    );

    // Active sessions
    const [activeSessions] = await pool.execute(
      'SELECT COUNT(*) as total FROM chat_sessions WHERE status = "active"'
    );

    // Average rating
    const [avgRating] = await pool.execute(
      'SELECT AVG(rating) as average FROM chat_sessions WHERE rating IS NOT NULL'
    );

    // Total messages
    const [totalMessages] = await pool.execute(
      'SELECT COUNT(*) as total FROM chat_messages'
    );

    // Sessions by status
    const [sessionsByStatus] = await pool.execute(
      'SELECT status, COUNT(*) as count FROM chat_sessions GROUP BY status'
    );

    res.json(successResponse({
      total_sessions: totalSessions[0].total,
      active_sessions: activeSessions[0].total,
      average_rating: avgRating[0].average ? parseFloat(avgRating[0].average).toFixed(2) : null,
      total_messages: totalMessages[0].total,
      sessions_by_status: sessionsByStatus
    }, 'Chat statistics retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching chat stats: ${error.message}`);
    next(error);
  }
};
