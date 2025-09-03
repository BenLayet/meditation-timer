import {
  createAccountErrorCodes,
  validateLoginFormat,
} from "domain/src/models/account.model.js";
import { FunctionalError } from "../errors/functional-error.js";

export class UserRepository {
  constructor(datasource, datasourceErrorCodes, uuidGenerator) {
    this.datasource = datasource;
    this.datasourceErrorCodes = datasourceErrorCodes;
    this.uuidGenerator = uuidGenerator;
  }

  async createUser(login, passwordHash) {
    validateLoginFormat(login);
    const uuid = this.uuidGenerator.createUuid();
    try {
      await this.datasource`
        INSERT INTO users (uuid, login, password_hash
        )
        VALUES (${uuid}, ${login}, ${passwordHash})`;
    } catch (error) {
      if (error.code === this.datasourceErrorCodes.UNIQUE_VIOLATION) {
        throw new FunctionalError(
          `user ${login} already exists`,
          createAccountErrorCodes.LOGIN_ALREADY_EXISTS,
        );
      } else {
        throw error;
      }
    }
    return { uuid, login };
  }
  async getUser(login) {
    validateLoginFormat(login);
    const row = await this.datasource`
      SELECT uuid, login, password_hash
      FROM users
      WHERE login = ${login}`;
    return row.map(fromRow)[0];
  }
}
const fromRow = ({ uuid, login, password_hash }) => ({
  uuid,
  login,
  passwordHash: password_hash,
});
