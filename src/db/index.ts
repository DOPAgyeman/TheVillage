import type { GetToken } from '@clerk/types';
import { createClient } from '@supabase/supabase-js';
import type { Database } from 'database.types';

// TODO: Remove sensitive environment variables from here
import { Env } from '@/core/env';

export async function clerkSupabaseClient(getToken: GetToken) {
  return createClient<Database>(
    String(Env.SUPABASE_URL),
    String(Env.SUPABASE_KEY),
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = await getToken({ template: 'supabase' }).catch(
            (error) => {
              throw new Error(`Failed to get clerk token ${error}`);
            }
          );
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${token}`);
          return fetch(url, { ...options, headers }).catch((error) => {
            throw new Error(`Failed to create supabase client: ${error}`);
          });
        },
      },
    }
  );
}
