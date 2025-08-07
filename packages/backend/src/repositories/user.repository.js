import {
  createAccountErrorCode,
  validateLoginFormat,
} from "domain/src/models/account.model.js";
import { FunctionalError } from "../errors/functional-error.js";

export class UserRepository {
  constructor(datasource, datasourceErrorCodes, uuidGenerator) {
    this.datasource = datasource;
    this.datasourceErrorCodes = datasourceErrorCodes;
    this.uuidGenerator = uuidGenerator;
  }

  async createUser(login) {
    validateLoginFormat(login);
    const uuid = this.uuidGenerator.createUuid();
    try {
      await this.datasource`
        INSERT INTO users (uuid, login)
        VALUES (${uuid}, ${login})`;
    } catch (error) {
      if (error.code === this.datasourceErrorCodes.UNIQUE_VIOLATION) {
        throw new FunctionalError(
          `user ${login} already exists`,
          createAccountErrorCode.LOGIN_ALREADY_EXISTS,
        );
      } else {
        throw error;
      }
    }
    return { uuid, login };
  }
  async getUser(login) {
    const row = await this.datasource`
        SELECT *
        FROM users
        WHERE login = ${login}`;
    return row[0];
  }
}
