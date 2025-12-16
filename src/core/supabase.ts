import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

// Client ini memiliki hak admin (service_role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
