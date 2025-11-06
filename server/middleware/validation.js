// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// Application validation rules
const applicationValidation = [
  body('type').isIn(['loan', 'saving']).withMessage('Type must be either loan or saving'),
  body('customer_name').trim().notEmpty().withMessage('Customer name is required'),
  body('customer_email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customer_phone').trim().notEmpty().withMessage('Phone number is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('purpose').optional().trim()
];

// Contact form validation
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('subject').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// Newsletter validation
const newsletterValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').optional().trim()
];

// Leadership validation
const leadershipValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('bio').optional().trim(),
  body('display_order').optional().isInt().withMessage('Display order must be an integer')
];

// Chat session validation
const chatSessionValidation = [
  body('session_id').trim().notEmpty().withMessage('Session ID is required'),
  body('customer_name').optional().trim(),
  body('customer_email').optional().isEmail().normalizeEmail()
];

// Chat message validation
const chatMessageValidation = [
  body('session_id').trim().notEmpty().withMessage('Session ID is required'),
  body('sender').isIn(['customer', 'bot', 'agent']).withMessage('Invalid sender type'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// ID parameter validation
const idValidation = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required')
];

module.exports = {
  validate,
  applicationValidation,
  contactValidation,
  newsletterValidation,
  leadershipValidation,
  chatSessionValidation,
  chatMessageValidation,
  idValidation
};
