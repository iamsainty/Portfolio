require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Load the environment variables
const SUPABASE_URL = process.env.SUPABASE_PROJECT_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON;

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export the Supabase client
module.exports = supabase;
