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

module.exports = { getPendingApplications, updateApplicationStatus };
