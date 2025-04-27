import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env')});

if (!process.env.JWT_SECRET) {
    throw new Error(' JWT_SECRET is missing from environment variables.');
  }
  
export const ENV = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string
};