const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.json({ message: 'Download route - coming soon' });
});

module.exports = router;