import dotenv from 'dotenv';
import path from 'path';

// Determine the environment and load the corresponding .env file
const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });
// Override console.debug to respect the DEBUG environment variable
if (!process.env.DEBUG) {
    console.debug = () => {}; // No-op if DEBUG is not set
}
console.debug(`Environment loaded from ${envFile}`);