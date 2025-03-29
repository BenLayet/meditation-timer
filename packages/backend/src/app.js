import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';

export const startApp = async ({ apiPort, routes}) => {
    const app = express();
    
    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    
    // Serve static files from the React app
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const staticFilesPath = path.join(__dirname, '../node_modules/frontend/dist'); 
    app.use(express.static(staticFilesPath));
    
    // Routes
    Object.entries(routes).forEach(([routeName, route]) => {
        app.use(`/api/v1/${routeName}`, route);
    });
    
    // Start server and return a promise
    return new Promise((resolve, reject) => {
        const server = app.listen(apiPort, () => {
            console.log(`Server running on port ${apiPort}`);
            resolve(server); // Resolve the promise with the server instance
        });

        server.on('error', (error) => {
            console.error('Failed to start server:', error);
            reject(error); // Reject the promise if an error occurs
        });
    });
    
}
