const express = require('express');
const router = express.Router();
const users = require('../users');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokens');
const { authenticate } = require('../middleware/auth');

// In-memory storage for refresh tokens (for testing)
let refreshTokens = [];

/**
 * @route   POST /auth/login
 * @desc    Authenticate user and get tokens
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

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken);

  // Set tokens in HTTP-only cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 900000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/auth/refresh', // Only send for refresh requests
    maxAge: 604800000 // 7 days
  });

  res.json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
    refreshToken
  });
});

/**
 * @route   POST /auth/refresh
 * @desc    Get new access token using refresh token
 */
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(403).json({ message: 'Expired refresh token' });
  }

  const user = users.find(u => u.id === decoded.id);
  if (!user) {
    return res.status(403).json({ message: 'User no longer exists' });
  }

  const newAccessToken = generateToken(user);

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 900000 // 15 mins
  });

  res.json({ accessToken: newAccessToken });
});

/**
 * @route   POST /auth/logout
 * @desc    Clear tokens
 */
router.post('/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  refreshTokens = refreshTokens.filter(t => t !== refreshToken);
  
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
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
