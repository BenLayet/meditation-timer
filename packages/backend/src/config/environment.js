import dotenv from 'dotenv';
import path from 'path';

// Determine the environment and load the corresponding .env file
const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`;
console.debug(`Loading environment from ${envFile}`);

dotenv.config({ path: path.resolve(process.cwd(), envFile) });