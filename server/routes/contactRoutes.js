const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { contactValidation, idValidation, validate } = require('../middleware/validation');

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post(
  '/',
  contactValidation,
  validate,
  contactController.submitContact
);

/**
 * @route   GET /api/contact/stats
 * @desc    Get contact statistics
 * @access  Admin
 */
router.get(
  '/stats',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  contactController.getContactStats
);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions
 * @access  Admin
 */
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  contactController.getAllSubmissions
);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact submission
 * @access  Admin
 */
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  idValidation,
  validate,
  contactController.getSubmissionById
);

/**
 * @route   PUT /api/contact/:id/status
 * @desc    Update contact submission status
 * @access  Admin
 */
router.put(
  '/:id/status',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'super_admin'),
  idValidation,
  validate,
  contactController.updateStatus
);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact submission
 * @access  Super Admin
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('super_admin'),
  idValidation,
  validate,
  contactController.deleteSubmission
);

module.exports = router;