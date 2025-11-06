const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { chatSessionValidation, chatMessageValidation, validate } = require('../middleware/validation');

/**
 * @route   POST /api/chat/sessions
 * @desc    Create a new chat session
 * @access  Public
 */
router.post(
  '/sessions',
  chatSessionValidation,
  validate,
  chatController.createSession
);

/**
 * @route   POST /api/chat/messages
 * @desc    Send a message in a chat session
 * @access  Public
 */
router.post(
  '/messages',
  chatMessageValidation,
  validate,
  chatController.sendMessage
);

/**
 * @route   GET /api/chat/sessions
 * @desc    Get all chat sessions (admin)
 * @access  Admin
 */
router.get(
  '/sessions',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  chatController.getAllSessions
);

/**
 * @route   GET /api/chat/sessions/:session_id/messages
 * @desc    Get messages for a specific session
 * @access  Public (for visitor), Admin
 */
router.get(
  '/sessions/:session_id/messages',
  chatController.getSessionMessages
);

/**
 * @route   PUT /api/chat/sessions/:session_id/end
 * @desc    End a chat session
 * @access  Public (for visitor), Admin
 */
router.put(
  '/sessions/:session_id/end',
  chatController.endSession
);

/**
 * @route   PUT /api/chat/sessions/:session_id/feedback
 * @desc    Submit feedback for a chat session
 * @access  Public
 */
router.put(
  '/sessions/:session_id/feedback',
  chatController.submitFeedback
);

/**
 * @route   GET /api/chat/stats
 * @desc    Get chat statistics
 * @access  Admin
 */
router.get(
  '/stats',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  chatController.getChatStats
);

module.exports = router;
