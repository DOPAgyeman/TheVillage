import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// TODO: Remove sensitive environment variables from here
import { Env } from './env';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: Env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
