import jwt from "jsonwebtoken";
import {
  validateNotEmptyString,
  validateNotNull,
  validateNotNullObject,
} from "@softer-software/functions/assert.functions.js";

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
