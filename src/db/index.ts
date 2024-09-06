import { createClient } from '@supabase/supabase-js';

// TODO: Remove sensitive environment variables from here
import { Env } from '@/core/env';

export const db = createClient(
  String(Env.SUPABASE_API_URL),
  String(Env.SUPABASE_SERVICE_KEY)
);
