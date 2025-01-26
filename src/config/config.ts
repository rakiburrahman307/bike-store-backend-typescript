import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

if (!process.env.MONGODB_URL) {
  throw new Error('Missing required environment variable: MONGODB_URI');
}

const config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  SALT_ROUND_BCRYPT: process.env.SALT_ROUND_BCRYPT,
  JWT_SECRET_KYE: process.env.JWT_SECRET_KYE,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
};

export default config;
