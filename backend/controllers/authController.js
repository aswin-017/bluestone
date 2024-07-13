const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');


exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if user already exists
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserSql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user in the database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'User already registered' });
      }

      // Hash the password and insert the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserSql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertUserSql, [firstName, lastName, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user into the database:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Error querying user from the database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name },
        'BLUESTONE', // Replace with your JWT secret key
        { expiresIn: '1h' }
      );
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful', token, user: { firstName: user.first_name, lastName: user.last_name }, admin: null });
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
