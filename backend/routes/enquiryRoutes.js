const express = require('express');
const { submitEnquiry } = require('../controllers/enquiryController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enquiryform', authenticateAdmin, submitEnquiry);

module.exports = router;
