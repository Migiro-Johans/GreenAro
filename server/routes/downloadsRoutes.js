const express = require('express');
const router = express.Router();
const downloadsController = require('../controllers/downloadsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { idValidation, validate } = require('../middleware/validation');
const { uploadForm } = require('../middleware/upload');

/**
 * @route   POST /api/downloads
 * @desc    Upload new downloadable form
 * @access  Admin
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  uploadForm,
  downloadsController.uploadForm
);

/**
 * @route   GET /api/downloads
 * @desc    Get all downloadable forms
 * @access  Public
 */
router.get(
  '/',
  downloadsController.getAllForms
);

/**
 * @route   GET /api/downloads/:id
 * @desc    Get single form details
 * @access  Public
 */
router.get(
  '/:id',
  idValidation,
  validate,
  downloadsController.getFormById
);

/**
 * @route   GET /api/downloads/:id/file
 * @desc    Download form file
 * @access  Public
 */
router.get(
  '/:id/file',
  idValidation,
  validate,
  downloadsController.downloadForm
);

/**
 * @route   PUT /api/downloads/:id
 * @desc    Update form details
 * @access  Admin
 */
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  uploadForm,
  idValidation,
  validate,
  downloadsController.updateForm
);

/**
 * @route   DELETE /api/downloads/:id
 * @desc    Delete form
 * @access  Admin
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  idValidation,
  validate,
  downloadsController.deleteForm
);

module.exports = router;
