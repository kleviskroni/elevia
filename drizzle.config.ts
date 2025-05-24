import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: '.env.local',
});

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Use Supabase Postgres connection string
    url: process.env.SUPABASE_DB_URL || '', // Set SUPABASE_DB_URL in your .env.production to your Supabase Postgres connection string
  },
});
