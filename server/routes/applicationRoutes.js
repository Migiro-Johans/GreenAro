// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationStats
} = require('../controllers/applicationsController');
const { 
  applicationValidation, 
  idValidation, 
  validate 
} = require('../middleware/validation');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
router.post('/loan', applicationValidation, validate, submitApplication);
router.post('/saving', applicationValidation, validate, submitApplication);

// Protected routes (admin only)
router.get('/', authenticateToken, authorizeRoles('admin', 'super_admin', 'manager'), getAllApplications);
router.get('/stats', authenticateToken, authorizeRoles('admin', 'super_admin', 'manager'), getApplicationStats);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'super_admin', 'manager'), idValidation, validate, getApplicationById);
router.put('/:id/status', authenticateToken, authorizeRoles('admin', 'super_admin', 'manager'), idValidation, validate, updateApplicationStatus);
router.delete('/:id', authenticateToken, authorizeRoles('super_admin'), idValidation, validate, deleteApplication);

module.exports = router;
