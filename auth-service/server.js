const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { authenticate, authorize } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true, // In production, specify your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

// Protected Route Example
app.get('/admin-only', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin! This is a protected route.' });
});

app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Auth service is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Auth Service (Testing) running on http://localhost:${PORT}`);
});
