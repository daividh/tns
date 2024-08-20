import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/modules/user/database/UserSchema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  verbose: true,
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'example',
    database: 'tns',
    ssl: false,
  },
});
