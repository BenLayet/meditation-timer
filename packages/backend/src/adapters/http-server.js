import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { eventsRouter } from "../routes/events.router.js";
import { healthRouter } from "../routes/health.router.js";
import { emailActivationsRouter } from "../routes/email-activations.router.js";
import { fileURLToPath } from "url";
import path from "path";

export const startHttpServer = async ({
  eventRepository,
  emailActivationService,
  apiProperties,
  version,
  environment,
  cleanupTasks,
}) => {
  // Serve static files from the React app
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const staticFilesPath = path.join(
    __dirname,
    "../../node_modules/frontend/dist"
  );
  const routes = {};
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(express.static(staticFilesPath));

  // Routes
  const { port, basePath } = apiProperties;
  app.use(`${basePath}/health`, healthRouter({ version, environment }));
  app.use(
    `${basePath}/email-activations`,
    emailActivationsRouter(emailActivationService)
  );
  app.use(`${basePath}/events`, eventsRouter(eventRepository));

  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.error("Error occurred:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  });

  // Start server
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  // Graceful shutdown logic
  const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    // Stop accepting new connections
    server.close(async (err) => {
      if (err) {
        console.error("Error while closing the server:", err);
        process.exit(1);
      }
      console.log("HTTP server closed.");

      // Execute cleanup tasks (e.g., closing database connections)
      for (const task of cleanupTasks) {
        try {
          await task();
        } catch (cleanupError) {
          console.error("Error during cleanup:", cleanupError);
        }
      }
      console.log("Cleanup completed. Exiting process.");
      process.exit(0);
    });
  };
  process.on("unhandledRejection", (reason, promise) => {
    console.error(
      "Unexpected unhandled rejection at:",
      promise,
      "reason:",
      reason
    );
  });
  // Listen for termination signals
  process.on("SIGINT", () => shutdown("SIGINT")); // Ctrl+C
  process.on("SIGUSR2", () => shutdown("SIGUSR2")); // Nodeamon restart
  process.on("SIGTERM", () => shutdown("SIGTERM")); // Termination signal (e.g., from Docker or Kubernetes)
};
