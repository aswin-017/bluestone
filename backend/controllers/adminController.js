const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
// controllers/AdminController.js
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@gmail.com' && password === 'password') {
    const admin = { email };
    const token = jwt.sign(
      { email: admin.email, role: 'admin' },
      'BLUESTONE', // Replace with your JWT secret key
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    console.log('Admin login successful:', { message: 'Login successful', token, user: null, admin });
    res.status(200).json({ message: 'Login successful', token, user: null, admin });
  } else {
    console.log('Admin login failed: Invalid login credentials');
    res.status(401).json({ message: 'Invalid login credentials' });
  }
};

exports.getUserCount = (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying user count from the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ count: results[0].count });
  });
};
// controllers/adminController.js
// controllers/adminController.js



exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, first_name, last_name, email FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users', details: err.message });
      return;
    }
    console.log('Fetched users:', results);
    res.status(200).json(results);
  });
};


