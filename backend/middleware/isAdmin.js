const supabase = require('../db/supabase');

module.exports = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', req.user.id)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error in admin middleware' });
    }
};
