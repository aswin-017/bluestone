const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'fallback_default_secret'; // Provide a default fallback secret

// Function to handle user signup
const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({ userId: newUser.id, email: newUser.email });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Example expiration time of 1 hour
};

module.exports = { signup, login };
