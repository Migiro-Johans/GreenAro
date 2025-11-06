// controllers/applicationsController.js
const db = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const logger = require('../utils/logger');

// Submit new application (loan or saving)
const submitApplication = async (req, res, next) => {
  try {
    const {
      type,
      product_name,
      customer_name,
      customer_email,
      customer_phone,
      amount,
      duration,
      purpose,
      employment_status,
      monthly_income,
      application_data
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO applications 
      (type, product_name, customer_name, customer_email, customer_phone, amount, duration, purpose, employment_status, monthly_income, application_data) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type,
        product_name,
        customer_name,
        customer_email,
        customer_phone,
        amount,
        duration || null,
        purpose || null,
        employment_status || null,
        monthly_income || null,
        application_data ? JSON.stringify(application_data) : null
      ]
    );

    logger.info(`New ${type} application submitted: ID ${result.insertId} by ${customer_email}`);

    return successResponse(res, {
      application_id: result.insertId,
      type,
      customer_email
    }, 'Application submitted successfully', 201);

  } catch (error) {
    logger.error(`Error submitting application: ${error.message}`);
    next(error);
  }
};

// Get all applications with filters and pagination
const getAllApplications = async (req, res, next) => {
  try {
    const { 
      type, 
      status, 
      page = 1, 
      limit = 10,
      search,
      sort_by = 'submitted_at',
      sort_order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = [];
    let params = [];

    if (type) {
      whereClause.push('type = ?');
      params.push(type);
    }

    if (status) {
      whereClause.push('status = ?');
      params.push(status);
    }

    if (search) {
      whereClause.push('(customer_name LIKE ? OR customer_email LIKE ? OR customer_phone LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereSQL = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

    // Get total count
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM applications ${whereSQL}`,
      params
    );
    const total = countResult[0].total;

    // Get applications
    const [applications] = await db.query(
      `SELECT * FROM applications ${whereSQL} 
      ORDER BY ${sort_by} ${sort_order} 
      LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    return paginatedResponse(res, applications, page, limit, total, 'Applications retrieved successfully');

  } catch (error) {
    logger.error(`Error fetching applications: ${error.message}`);
    next(error);
  }
};

// Get single application by ID
const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [applications] = await db.query(
      'SELECT * FROM applications WHERE id = ?',
      [id]
    );

    if (applications.length === 0) {
      return errorResponse(res, 'Application not found', 404);
    }

    return successResponse(res, applications[0], 'Application retrieved successfully');

  } catch (error) {
    logger.error(`Error fetching application: ${error.message}`);
    next(error);
  }
};

// Update application status
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason, reviewed_by } = req.body;

    const validStatuses = ['pending', 'under_review', 'approved', 'rejected', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return errorResponse(res, 'Invalid status value', 400);
    }

    const [result] = await db.query(
      `UPDATE applications 
      SET status = ?, rejection_reason = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP 
      WHERE id = ?`,
      [status, rejection_reason || null, reviewed_by || null, id]
    );

    if (result.affectedRows === 0) {
      return errorResponse(res, 'Application not found', 404);
    }

    logger.info(`Application ${id} status updated to ${status} by ${reviewed_by || 'system'}`);

    return successResponse(res, { id, status }, 'Application status updated successfully');

  } catch (error) {
    logger.error(`Error updating application status: ${error.message}`);
    next(error);
  }
};

// Delete application
const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM applications WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return errorResponse(res, 'Application not found', 404);
    }

    logger.info(`Application ${id} deleted`);

    return successResponse(res, null, 'Application deleted successfully');

  } catch (error) {
    logger.error(`Error deleting application: ${error.message}`);
    next(error);
  }
};

// Get application statistics
const getApplicationStats = async (req, res, next) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN type = 'loan' THEN 1 ELSE 0 END) as loans,
        SUM(CASE WHEN type = 'saving' THEN 1 ELSE 0 END) as savings,
        SUM(amount) as total_amount
      FROM applications
    `);

    return successResponse(res, stats[0], 'Application statistics retrieved successfully');

  } catch (error) {
    logger.error(`Error fetching application stats: ${error.message}`);
    next(error);
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationStats
};
