import jwt from "jsonwebtoken";
import {
  validateNotNull,
  validateNotNullObject,
  validateNotEmptyString,
} from "domain/src/lib/assert/not-null.validator.js";

export class JwtTokenService {
  constructor(jwtSecret, logger) {
    validateNotNull({ jwtSecret });
    validateNotNull({ logger });
    this.jwtSecret = jwtSecret;
    this.logger = logger;
  }

  createShortLivedToken(payload) {
    validateNotNullObject({ payload });
    this.logger.debug(`createShortLivedToken ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });
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
