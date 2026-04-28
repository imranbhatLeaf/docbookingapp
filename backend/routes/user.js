const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock user profile controller function
const getUserProfile = async (req, res) => {
  try {
    // Scaffold: Fetch user from DB
    // const user = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
    // res.json(user.rows[0]);

    // For now, return mock profile
    res.json({ id: req.user.id, name: 'Mock User', email: 'mock@example.com', role: 'patient' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

router.route('/profile').get(protect, getUserProfile);

module.exports = router;
