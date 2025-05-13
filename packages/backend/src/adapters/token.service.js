import jwt from "jsonwebtoken";

export class JwtTokenService {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }
  createShortLivedToken(payload) {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });
  }
  createPermanentToken(payload) {
    return jwt.sign(payload, this.jwtSecret);
  }
  verify(token) {
    return jwt.verify(token);
  }
}
