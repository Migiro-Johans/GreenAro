const express = require('express');
const router = express.Router();
const leadershipController = require('../controllers/leadershipController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { leadershipValidation, idValidation, validate } = require('../middleware/validation');
const { uploadLeadershipImage } = require('../middleware/upload');

/**
 * @route   POST /api/leadership
 * @desc    Add new leadership member with image
 * @access  Admin
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  uploadLeadershipImage,
  leadershipValidation,
  validate,
  leadershipController.addLeader
);

/**
 * @route   GET /api/leadership
 * @desc    Get all leadership members
 * @access  Public
 */
router.get(
  '/',
  leadershipController.getAllLeaders
);

/**
 * @route   GET /api/leadership/:id
 * @desc    Get single leadership member
 * @access  Public
 */
router.get(
  '/:id',
  idValidation,
  validate,
  leadershipController.getLeaderById
);

/**
 * @route   PUT /api/leadership/:id
 * @desc    Update leadership member
 * @access  Admin
 */
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  uploadLeadershipImage,
  idValidation,
  leadershipValidation,
  validate,
  leadershipController.updateLeader
);

/**
 * @route   DELETE /api/leadership/:id
 * @desc    Delete leadership member
 * @access  Super Admin
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('super_admin'),
  idValidation,
  validate,
  leadershipController.deleteLeader
);

module.exports = router;
