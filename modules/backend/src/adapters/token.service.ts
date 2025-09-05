import jwt from "jsonwebtoken";
import {
  validateNotEmptyString,
  validateNotNull,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions.js";

export class JwtTokenService {
  private jwtSecret: string;
  private logger: any;

  constructor(jwtSecret: string, logger: any) {
    validateNotNull({ jwtSecret });
    validateNotNull({ logger });
    this.jwtSecret = jwtSecret;
    this.logger = logger;
  }

  createPermanentToken(payload: any): string {
    validateNotNullObject({ payload });
    this.logger.debug(`createPermanentToken ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.jwtSecret);
  }

  verify(token: string): any {
    validateNotEmptyString({ token });
    return jwt.verify(token, this.jwtSecret);
  }
}
