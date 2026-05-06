/**
 * Hardcoded user store for testing purposes.
 * In a real application, this would be replaced by a database.
 */
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123', // In production, use hashed passwords (e.g., bcrypt)
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'test@example.com',
    password: 'password456',
    name: 'Test User',
    role: 'user'
  }
];

module.exports = users;
