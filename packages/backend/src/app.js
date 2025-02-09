import './config/environment.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';
import {meditationsRouter} from './routes/meditations.router.js';
import healthRoutes from './routes/health.router.js';
import MeditationRepository from "./repositories/meditation.repository.js";
import {datasource} from "./config/datasource.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../node_modules/frontend/dist')));

// Routes
app.use('/api/v1/health', healthRoutes); // Add this line
app.use('/api/v1/meditations', meditationsRouter(new MeditationRepository(datasource)));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


