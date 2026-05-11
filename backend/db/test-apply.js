require('dotenv').config({ path: '../.env' });
const supabase = require('./supabase');

async function testApply() {
  const userId = 1; // Assuming a user ID exists, maybe 1? Or we just see the error
  const { data, error } = await supabase
    .from('doctors')
    .insert([
      { user_id: userId, name: "Test Doc", specialty: "Test", document_url: "Test", status: 'pending' }
    ])
    .select()
    .single();
  
  if (error) console.error("Error:", error);
  else console.log("Success:", data);
}
testApply();
