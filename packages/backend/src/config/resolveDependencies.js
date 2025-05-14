export async function resolveDependencies(providers) {
  const resolved = await providers.environmentProperties();
  resolved.emailActivationUrl = await providers.emailActivationUrl(resolved);
  resolved.datasource = await providers.datasource(resolved);
  resolved.transactionService = await providers.transactionService(resolved);
  resolved.uuidService = await providers.uuidService(resolved);
  resolved.tokenService = await providers.tokenService(resolved);
  resolved.emailService = await providers.emailService(resolved);
  resolved.eventRepository = await providers.eventRepository(resolved);
  resolved.userRepository = await providers.userRepository(resolved);
  resolved.emailActivationRepository =
    await providers.emailActivationRepository(resolved);
  resolved.emailActivationService =
    await providers.emailActivationService(resolved);
  resolved.serverConfig = await providers.serverConfig(resolved);
  return resolved;
}
