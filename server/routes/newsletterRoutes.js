const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { newsletterValidation, idValidation, validate } = require('../middleware/validation');

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe to newsletter
 * @access  Public
 */
router.post(
  '/subscribe',
  newsletterValidation,
  validate,
  newsletterController.subscribe
);

/**
 * @route   POST /api/newsletter/unsubscribe
 * @desc    Unsubscribe from newsletter
 * @access  Public
 */
router.post(
  '/unsubscribe',
  newsletterController.unsubscribe
);

/**
 * @route   GET /api/newsletter/stats
 * @desc    Get newsletter statistics
 * @access  Admin
 */
router.get(
  '/stats',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  newsletterController.getNewsletterStats
);

/**
 * @route   GET /api/newsletter/subscribers
 * @desc    Get all newsletter subscribers
 * @access  Admin
 */
router.get(
  '/subscribers',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  newsletterController.getAllSubscribers
);

/**
 * @route   GET /api/newsletter/export
 * @desc    Export subscribers as CSV
 * @access  Admin
 */
router.get(
  '/export',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  newsletterController.exportSubscribers
);

/**
 * @route   DELETE /api/newsletter/subscribers/:id
 * @desc    Delete subscriber
 * @access  Super Admin
 */
router.delete(
  '/subscribers/:id',
  authenticateToken,
  authorizeRoles('super_admin'),
  idValidation,
  validate,
  newsletterController.deleteSubscriber
);

module.exports = router;