const db = require('../config/database');
const { findBestResponse } = require('../utils/chatbotLogic');
const emailService = require('../utils/emailService');

// Handle chat message
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, name, email, phone, message } = req.body;

    // Save user message
    await db.query(
      'INSERT INTO chat_messages (session_id, name, email, phone, message, is_bot) VALUES (?, ?, ?, ?, ?, ?)',
      [sessionId, name, email, phone, message, false]
    );

    // Get bot response
    const { response, requiresHuman } = findBestResponse(message);

    // Save bot response
    await db.query(
      'INSERT INTO chat_messages (session_id, message, response, is_bot, requires_human) VALUES (?, ?, ?, ?, ?)',
      [sessionId, message, response, true, requiresHuman]
    );

    // If human intervention needed, create alert
    if (requiresHuman) {
      await db.query(
        'INSERT INTO customer_service_alerts (chat_session_id, customer_name, customer_email, customer_phone, reason) VALUES (?, ?, ?, ?, ?)',
        [sessionId, name, email, phone, 'Bot unable to answer query']
      );

      // Send email to customer service
      await emailService.sendAlertEmail({
        name,
        email,
        phone,
        message,
        sessionId
      });
    }

    res.json({
      success: true,
      response,
      requiresHuman
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const [messages] = await db.query(
      'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC',
      [sessionId]
    );
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};