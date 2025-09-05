import { JwtTokenService } from "../adapters/token.service.js";

export const tokenServiceProviders = {
  //TOKEN
  jwtSecret: () => process.env["JWT_SECRET"],
  tokenService: ({ jwtSecret, logger }) =>
    new JwtTokenService(jwtSecret, logger),
};
