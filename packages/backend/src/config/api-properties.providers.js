import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailSender } from "../adapters/email-sender.js";
import { EmailVerificationRepository } from "../repositories/email-verification.repository.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidGenerator } from "../adapters/uuid-generator.js";
import { logger } from "../adapters/logger.js";
import { MessageBuilder } from "../service/message-builder.service.js";

export const apiPropertiesProviders = {
  //API
  apiProperties: () => ({
    host: process.env["API_HOST"],
    port: process.env["API_PORT"],
    protocol: process.env["API_PROTOCOL"],
    version: process.env["API_VERSION"],
    basePath: `/api/${process.env["API_VERSION"]}`,
  }),
};
