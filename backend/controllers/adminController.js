const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const adminCredentials = {
    email: 'admin@gmail.com',
    password: 'password'
  };
  
  exports.adminLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (email === adminCredentials.email && password === adminCredentials.password) {
      res.status(200).json({ admin: { email } });
    } else {
      res.status(401).json({ error: 'Invalid login credentials' });
    }
  };

// Get user count
exports.getUserCount = (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching user count:', err);
      res.status(500).json({ error: 'Error fetching user count' });
      return;
    }
    res.status(200).json(results[0]);
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, email FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.status(200).json(results);
  });
};

// Get user details by ID
exports.getUserDetailsById = (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      res.status(500).json({ error: 'Error fetching user details' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(results[0]);
  });
};
