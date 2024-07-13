const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Define the admin login route
router.post('/login', AdminController.adminLogin);
router.get('/usercount', AdminController.getUserCount);
router.get('/users', AdminController.getAllUsers);

module.exports = router;
