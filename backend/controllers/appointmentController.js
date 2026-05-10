const supabase = require('../db/supabase');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([
        { user_id: req.user.id, doctor_id: doctorId, appointment_date: date, time: time, status: 'booked' }
      ])
      .select('*')
      .single();

    if (error) throw error;
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*, doctors(id, name, specialty)')
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(appointments || []);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { bookAppointment, getMyAppointments };
