const supabase = require('../db/supabase');

// Get all pending doctor applications
const getPendingApplications = async (req, res) => {
    try {
        const { data: applications, error } = await supabase
            .from('doctors')
            .select(`
                *,
                users(name, email)
            `)
            .eq('status', 'pending');

        if (error) throw error;
        
        // Format the response slightly to make it easier for the frontend
        const formatted = applications.map(app => ({
            ...app,
            doctorName: app.users?.name,
            doctorEmail: app.users?.email
        }));

        res.json(formatted);
    } catch (error) {
        console.error('Error fetching pending applications:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const { data: doctor, error } = await supabase
            .from('doctors')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ message: `Application ${status}`, doctor });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {
        const { count: userCount, error: userError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });

        const { count: doctorCount, error: doctorError } = await supabase
            .from('doctors')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'approved');

        const { count: appointmentCount, error: appError } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true });

        const { count: pendingCount, error: pendingError } = await supabase
            .from('doctors')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        if (userError || doctorError || appError || pendingError) {
            throw userError || doctorError || appError || pendingError;
        }

        res.json({
            users: userCount || 0,
            doctors: doctorCount || 0,
            appointments: appointmentCount || 0,
            pendingApplications: pendingCount || 0
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all feedback
const getFeedback = async (req, res) => {
    try {
        const { data: feedback, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            // If table doesn't exist yet, return empty array instead of 500
            if (error.code === '42P01') return res.json([]);
            throw error;
        }

        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('feedback')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { 
    getPendingApplications, 
    updateApplicationStatus, 
    getDashboardStats, 
    getFeedback, 
    deleteFeedback 
};
