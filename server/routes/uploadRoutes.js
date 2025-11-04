const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
  res.json({ message: 'Upload route - coming soon' });
});

module.exports = router;