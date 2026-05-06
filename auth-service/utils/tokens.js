const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-for-testing';
const JWT_EXPIRES_IN = '1h';

/**
 * Generates a JWT for a given user.
 * @param {Object} user - The user object.
 * @returns {string} The generated token.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Verifies a JWT.
 * @param {string} token - The token to verify.
 * @returns {Object} The decoded payload.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
