const pool = require('../config/database');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const fs = require('fs').promises;
const path = require('path');

/**
 * Upload a new downloadable form
 * @route POST /api/downloads
 * @access Admin
 */
exports.uploadForm = async (req, res, next) => {
  try {
    const { title, description, category = 'general', is_active = 1 } = req.body;

    if (!req.file) {
      return res.status(400).json(errorResponse('File is required'));
    }

    if (!title) {
      return res.status(400).json(errorResponse('Title is required'));
    }

    const file_path = `/uploads/forms/${req.file.filename}`;
    const file_name = req.file.originalname;
    const file_size = req.file.size;
    const mime_type = req.file.mimetype;

    const query = `
      INSERT INTO downloads (title, description, file_name, file_path, file_size, mime_type, category, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      title,
      description || null,
      file_name,
      file_path,
      file_size,
      mime_type,
      category,
      is_active
    ]);

    logger.info(`New form uploaded: ${title} (ID: ${result.insertId})`);

    res.status(201).json(successResponse({
      id: result.insertId,
      title,
      description,
      file_name,
      file_path,
      file_size,
      mime_type,
      category,
      is_active,
      download_count: 0
    }, 'Form uploaded successfully'));

  } catch (error) {
    logger.error(`Error uploading form: ${error.message}`);
    next(error);
  }
};

/**
 * Get all downloadable forms
 * @route GET /api/downloads
 * @access Public
 */
exports.getAllForms = async (req, res, next) => {
  try {
    const { category, active_only = 'true' } = req.query;
    
    let query = 'SELECT * FROM downloads WHERE 1=1';
    const params = [];

    if (active_only === 'true') {
      query += ' AND is_active = 1';
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const [forms] = await pool.execute(query, params);

    res.json(successResponse(forms, 'Forms retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching forms: ${error.message}`);
    next(error);
  }
};

/**
 * Get a single form by ID
 * @route GET /api/downloads/:id
 * @access Public
 */
exports.getFormById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [forms] = await pool.execute(
      'SELECT * FROM downloads WHERE id = ?',
      [id]
    );

    if (forms.length === 0) {
      return res.status(404).json(errorResponse('Form not found'));
    }

    res.json(successResponse(forms[0], 'Form retrieved successfully'));

  } catch (error) {
    logger.error(`Error fetching form: ${error.message}`);
    next(error);
  }
};

/**
 * Download a form file
 * @route GET /api/downloads/:id/file
 * @access Public
 */
exports.downloadForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get form details
    const [forms] = await pool.execute(
      'SELECT * FROM downloads WHERE id = ? AND is_active = 1',
      [id]
    );

    if (forms.length === 0) {
      return res.status(404).json(errorResponse('Form not found or inactive'));
    }

    const form = forms[0];
    const filePath = path.join(__dirname, '..', form.file_path);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (err) {
      logger.error(`File not found: ${filePath}`);
      return res.status(404).json(errorResponse('File not found on server'));
    }

    // Increment download count
    await pool.execute(
      'UPDATE downloads SET download_count = download_count + 1 WHERE id = ?',
      [id]
    );

    logger.info(`Form downloaded: ${form.title} (ID: ${id})`);

    // Send file
    res.download(filePath, form.file_name, (err) => {
      if (err) {
        logger.error(`Error downloading file: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).json(errorResponse('Error downloading file'));
        }
      }
    });

  } catch (error) {
    logger.error(`Error in download process: ${error.message}`);
    next(error);
  }
};

/**
 * Update a form
 * @route PUT /api/downloads/:id
 * @access Admin
 */
exports.updateForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, is_active } = req.body;

    // Check if form exists
    const [existing] = await pool.execute(
      'SELECT * FROM downloads WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Form not found'));
    }

    const oldFilePath = existing[0].file_path;

    // Prepare update data
    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description);
    }
    if (category !== undefined) {
      updates.push('category = ?');
      params.push(category);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active);
    }

    // Handle file replacement
    if (req.file) {
      const new_file_path = `/uploads/forms/${req.file.filename}`;
      const new_file_name = req.file.originalname;
      const new_file_size = req.file.size;
      const new_mime_type = req.file.mimetype;

      updates.push('file_name = ?', 'file_path = ?', 'file_size = ?', 'mime_type = ?');
      params.push(new_file_name, new_file_path, new_file_size, new_mime_type);

      // Delete old file
      if (oldFilePath) {
        const oldFileFullPath = path.join(__dirname, '..', oldFilePath);
        try {
          await fs.unlink(oldFileFullPath);
          logger.info(`Deleted old file: ${oldFileFullPath}`);
        } catch (err) {
          logger.warn(`Failed to delete old file: ${err.message}`);
        }
      }
    }

    if (updates.length === 0) {
      return res.status(400).json(errorResponse('No fields to update'));
    }

    params.push(id);
    const query = `UPDATE downloads SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    await pool.execute(query, params);

    // Fetch updated form
    const [updated] = await pool.execute('SELECT * FROM downloads WHERE id = ?', [id]);

    logger.info(`Form updated: ${id}`);

    res.json(successResponse(updated[0], 'Form updated successfully'));

  } catch (error) {
    logger.error(`Error updating form: ${error.message}`);
    next(error);
  }
};

/**
 * Delete a form
 * @route DELETE /api/downloads/:id
 * @access Admin
 */
exports.deleteForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if form exists
    const [existing] = await pool.execute(
      'SELECT * FROM downloads WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json(errorResponse('Form not found'));
    }

    const filePath = existing[0].file_path;

    // Delete from database
    await pool.execute('DELETE FROM downloads WHERE id = ?', [id]);

    // Delete file if exists
    if (filePath) {
      const fileFullPath = path.join(__dirname, '..', filePath);
      try {
        await fs.unlink(fileFullPath);
        logger.info(`Deleted file: ${fileFullPath}`);
      } catch (err) {
        logger.warn(`Failed to delete file: ${err.message}`);
      }
    }

    logger.info(`Form deleted: ${id}`);

    res.json(successResponse(null, 'Form deleted successfully'));

  } catch (error) {
    logger.error(`Error deleting form: ${error.message}`);
    next(error);
  }
};
