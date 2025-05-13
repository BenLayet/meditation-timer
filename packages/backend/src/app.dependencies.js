import { createDatasource } from "./config/datasource.js";
import { EventRepository } from "./repositories/event.repository.js";
import { eventsRouter } from "./routes/events.router.js";
import { healthRouter } from "./routes/health.router.js";
import { emailActivationsRouter } from "./routes/email-activations.router.js";
import { MailgunEmailService } from "./adapters/email.service.js";
import { EmailActivationRepository } from "./repositories/email-activation.repository.js";
import { EmailActivationService } from "./services/email-activation.service.js";
import { JwtTokenService } from "./adapters/token.service.js";
import { UuidService } from "./adapters/uuid.service.js";
import { TransactionService } from "./repositories/transaction.service.js";
import { UserRepository } from "./repositories/user.repository.js";

//TODO all dependendencies should be in providers
export function appDependencies(
  environmentProperties,
  adapters = {
    emailServiceProvider: () => new MailgunEmailService(),
    tokenServiceProvider: (jwtSecret) => new JwtTokenService(jwtSecret),
    uuidServiceProvider: () => new UuidService(),
  }
) {
  const { apiHost, apiPort, apiVersion, datasourceConfig, jwtSecret } =
    environmentProperties;
  const { emailServiceProvider, tokenServiceProvider, uuidServiceProvider } =
    adapters;
  const datasource = createDatasource(datasourceConfig);
  const eventRepository = new EventRepository(datasource);

  const transactionService = new TransactionService(datasource);
  const emailActivationRepository = new EmailActivationRepository(datasource);
  const userRepository = new UserRepository(datasource);
  const emailActivationService = new EmailActivationService(
    transactionService,
    emailActivationRepository,
    userRepository,
    `${apiHost}:${apiPort}/api/${apiVersion}/email-activations/`,
    emailServiceProvider(),
    tokenServiceProvider(jwtSecret),
    uuidServiceProvider()
  );
  const routes = {
    events: eventsRouter(eventRepository),
    health: healthRouter(environmentProperties),
    "email-activations": emailActivationsRouter(emailActivationService),
  };
  const cleanupTasks = [datasource.end];
  return { apiPort, routes, cleanupTasks };
}
