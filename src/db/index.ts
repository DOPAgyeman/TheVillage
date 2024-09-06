import { createClient } from '@supabase/supabase-js';

export const db = createClient(
  String(process.env.SUPABASE_API_URL),
  String(process.env.SUPABASE_SERVICE_KEY)
);
