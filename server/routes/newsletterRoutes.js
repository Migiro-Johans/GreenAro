const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    await db.query(
      'INSERT INTO newsletter_subscriptions (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = TRUE',
      [email]
    );

    res.json({ success: true, message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;