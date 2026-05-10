const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const auth = require('../middleware/auth');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

router.route('/profile').get(auth, getUserProfile);

module.exports = router;
