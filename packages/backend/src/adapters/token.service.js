import jwt from "jsonwebtoken";
import { validateNotNull, validateNotNullObject, validateNotEmptyString} from "../validators/not-null.validator.js";

export class JwtTokenService {
  constructor(jwtSecret, logger) {
    validateNotNull(jwtSecret, "jwtSecret should not be null");
    validateNotNull(logger, "logger should not be null");
    this.jwtSecret = jwtSecret;
    this.logger = logger;
  }
  createShortLivedToken(payload) {
    validateNotNullObject(payload);
    this.logger.debug(`createShortLivedToken ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });
  }
  createPermanentToken(payload) {
    validateNotNullObject(payload);
    this.logger.debug(`createPermanentToken ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.jwtSecret);
  }
  verify(token) {
    validateNotEmptyString(token);
    this.logger.debug(`Verifying token ${token}`);
    return jwt.verify(token);
  }
}
