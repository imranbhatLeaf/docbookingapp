const supabase = require('../db/supabase');

const getDoctors = async (req, res) => {
  try {
    const { data: doctors, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('status', 'approved');

    if (error) throw error;
    res.json(doctors || []);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { data: doctor, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      throw error;
    }
    
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by id:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const applyForDoctor = async (req, res) => {
  try {
    const { specialty, documentUrl, name } = req.body;
    const userId = req.user.id;

    // Insert into doctors table as pending
    const { data: doctor, error } = await supabase
      .from('doctors')
      .insert([
        { user_id: userId, name: name, specialty, document_url: documentUrl, status: 'pending' }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error applying for doctor:', error);
    res.status(500).json({ message: error.message || error.details || 'Server Error' });
  }
};

const getMyDoctorProfile = async (req, res) => {
  try {
    const { data: doctor, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      throw error;
    }
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching my doctor profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDoctors, getDoctorById, applyForDoctor, getMyDoctorProfile };
