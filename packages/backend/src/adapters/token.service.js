import jwt from "jsonwebtoken";
import {
  validateNotEmptyString,
  validateNotNull,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";

export class JwtTokenService {
  constructor(jwtSecret, logger) {
    validateNotNull({ jwtSecret });
    validateNotNull({ logger });
    this.jwtSecret = jwtSecret;
    this.logger = logger;
  }
  createPermanentToken(payload) {
    validateNotNullObject({ payload });
    this.logger.debug(`createPermanentToken ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.jwtSecret);
  }

  verify(token) {
    validateNotEmptyString({ token });
    return jwt.verify(token, this.jwtSecret);
  }
}
