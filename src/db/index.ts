import { createClient } from '@supabase/supabase-js';

export const db = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
