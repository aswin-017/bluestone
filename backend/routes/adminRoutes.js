// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.adminLogin);

// Get user count route
router.get('/usercount', adminController.getUserCount);

// Get all users route
router.get('/users', adminController.getAllUsers);

// Get user details by ID route
router.get('/users/:id', adminController.getUserDetailsById);

module.exports = router;
