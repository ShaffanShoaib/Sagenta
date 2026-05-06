const express = require('express');
const router = express.Router();
const users = require('../users');
const { generateToken } = require('../utils/tokens');
const { authenticate } = require('../middleware/auth');

/**
 * @route   POST /auth/login
 * @desc    Authenticate user and get token
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);

  // Set token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000 // 1 hour
  });

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    token // Also return token for testing/mobile clients
  });
});

/**
 * @route   POST /auth/logout
 * @desc    Clear auth cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

/**
 * @route   GET /auth/me
 * @desc    Get current user profile
 */
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
