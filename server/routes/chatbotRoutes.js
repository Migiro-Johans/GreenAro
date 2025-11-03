const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/message', chatbotController.sendMessage);
router.get('/history/:sessionId', chatbotController.getChatHistory);

module.exports = router;