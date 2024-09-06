import { createClient } from '@supabase/supabase-js';

import { Env } from '@/core/env';

export const db = createClient(
  String(Env.SUPABASE_API_URL),
  String(Env.SUPABASE_SERVICE_KEY)
);
