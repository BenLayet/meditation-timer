import { eventsRouter } from "../routes/events.router.js";
import { healthRouter } from "../routes/health.router.js";
import { emailActivationsRouter } from "../routes/email-activations.router.js";
import { fileURLToPath } from "url";
import path from "path";

export function serverConfig({
  eventRepository,
  emailActivationService,
  apiPort,
  apiVersion,
  version,
  environment,
  datasource
}) {
  const baseUrl = `/api/${apiVersion}`;
  // Serve static files from the React app
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const staticFilesPath = path.join(
    __dirname,
    "../../node_modules/frontend/dist"
  );
  const routes = {
    events: eventsRouter(eventRepository),
    health: healthRouter({ version, environment }),
    "email-activations": emailActivationsRouter(emailActivationService),
  };
  const cleanupTasks = [datasource.end];
  return { baseUrl, apiPort, staticFilesPath, routes, cleanupTasks };
}
