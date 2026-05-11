const express = require('express');
const supabase = require('../db/supabase');
const auth = require('../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(auth);

// Create an appointment
router.post('/', async (req, res) => {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Optional: check if slot is already taken
        const { data: conflict, error: conflictError } = await supabase
            .from('appointments')
            .select('*')
            .eq('doctor_id', doctorId)
            .eq('appointment_date', date)
            .eq('time', time);

        if (conflictError) throw conflictError;
        
        if (conflict && conflict.length > 0) {
            return res.status(409).json({ message: 'Time slot already booked' });
        }

        const { data, error } = await supabase
            .from('appointments')
            .insert([
                { user_id: patientId, doctor_id: doctorId, appointment_date: date, time, status: 'confirmed' }
            ])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get my appointments (as patient)
router.get('/my', async (req, res) => {
    const patientId = req.user.id;
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                doctors (
                    name,
                    specialty
                )
            `)
            .eq('user_id', patientId)
            .order('appointment_date', { ascending: false })
            .order('time', { ascending: false });

        if (error) throw error;

        // Flatten and format to match frontend expectations
        const formattedData = data.map(app => ({
            ...app,
            date: app.appointment_date,
            doctorName: app.doctors?.name,
            specialty: app.doctors?.specialty
        }));

        res.json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel an appointment (only if it's yours)
router.delete('/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const patientId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', appointmentId)
            .eq('user_id', patientId)
            .select();

        if (error) throw error;
        
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Appointment not found or not yours' });
        }
        res.json({ message: 'Cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
