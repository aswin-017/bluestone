const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import JWT module
const cors = require('cors'); // Ensure CORS is imported
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Enable cookie parsing

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Aswin@17', // Replace with your MySQL password
  database: 'bluestone_crm_db', // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Signup Endpoint
app.post('/api/users/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get current timestamp
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Insert new user into the database
    await db.promise().query(
      'INSERT INTO users (first_name, last_name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword, currentTimestamp, currentTimestamp]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal server error' }); // Send generic error message
  }
});

// Login Endpoint
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT with the secret key 'BLUESTONE'
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, firstName: user[0].first_name, lastName: user[0].last_name },
      'BLUESTONE', // Replace with your JWT secret key
      { expiresIn: '1h' } // Token expiry time
    );

    // Set cookie with JWT
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'Login successful', token, user: { firstName: user[0].first_name, lastName: user[0].last_name } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Protected Route Example
app.get('/api/users/profile', verifyToken, async (req, res) => {
  // Get user information from decoded token (available in req.user)
  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { firstName: user[0].first_name, lastName: user[0].last_name, email: user[0].email } });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to verify JWT from cookies
function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, 'BLUESTONE', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded; // Attach decoded user information to request object
    next();
  });
}

// Logout Endpoint
app.get('/api/users/logout', (req, res) => {
  res.clearCookie('token'); // Clear the JWT cookie on logout
  res.status(200).json({ message: 'Logout successful' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
