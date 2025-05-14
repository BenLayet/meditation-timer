export function resolveDependencies(providers) {
  const resolved = providers.environmentProperties();
  resolved.emailActivationUrl = providers.emailActivationUrl(resolved);
  resolved.datasource = providers.datasource(resolved);
  resolved.transactionService = providers.transactionService(resolved);
  resolved.uuidService =    providers.uuidService(resolved);
  resolved.tokenService =    providers.tokenService(resolved);
  resolved.emailService =    providers.emailService(resolved);
  resolved.eventRepository = providers.eventRepository(resolved);
  resolved.userRepository = providers.userRepository(resolved);
  resolved.emailActivationRepository =    providers.emailActivationRepository(resolved);
  resolved.emailActivationService = providers.emailActivationService(resolved);
  resolved.serverConfig = providers.serverConfig(resolved);
  return resolved;
}
