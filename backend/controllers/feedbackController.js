const supabase = require('../db/supabase');

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;
    const userId = req.user ? req.user.id : null;

    const { data, error } = await supabase
      .from('feedback')
      .insert([
        { user_id: userId, name, email, message, rating: parseInt(rating) || 5 }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Feedback submitted successfully', data });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitFeedback };
