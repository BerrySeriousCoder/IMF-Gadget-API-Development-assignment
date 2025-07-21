import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/models/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  url: process.env.DATABASE_URL as string,
} satisfies Config; 