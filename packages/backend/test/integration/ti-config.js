import '../../src/config/environment.js';
const API_HOST = process.env.API_HOST ?? 'localhost';
const API_PORT = process.env.API_PORT ?? 8000;
const API_URL = `http://${API_HOST}:${API_PORT}/api/v1`;
export const MEDITATIONS_API_URL = `${API_URL}/meditations`;
export const HEALTH_API_URL = `${API_URL}/health`;
