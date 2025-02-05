import postgres from 'postgres'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const datasource = postgres({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: 'require',

})