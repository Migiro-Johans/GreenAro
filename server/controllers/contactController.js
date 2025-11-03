const db = require('../config/database');
const emailService = require('../utils/emailService');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Save to database
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );

    // Send confirmation email
    await emailService.sendContactConfirmation({ name, email });

    res.json({
      success: true,
      message: 'Your message has been received. We\'ll get back to you soon!',
      contactId: result.insertId
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};