import { FunctionalError } from "../errors/functional-error.js";
import { errorCodes } from "@meditation-timer/domain/src/errors/error-codes.js";
import {
  validateNotNullObject,
  validateNotEmptyString,
} from "@softer-software/functions/assert.functions.js";
import { accountStatus as statusCodes } from "@meditation-timer/domain/src/models/account.model.js";

export class LocalAccountService {
  constructor(keyValueStorageService) {
    this.keyValueStorageService = keyValueStorageService;
  }

  getAccount = async () => this.keyValueStorageService.get("account");
  getAccountStatus = async () => {
    const account = await this.getAccount();
    return account ? statusCodes.AUTHENTICATED : statusCodes.ANONYMOUS;
  };

  isAuthenticated = async () => {
    const status = await this.getAccountStatus();
    return status === statusCodes.AUTHENTICATED;
  };

  getUserToken = async () => {
    if (!(await this.isAuthenticated())) {
      throw new FunctionalError(
        "Cannot get user token",
        errorCodes.USER_NOT_AUTHENTICATED,
      );
    }
    const account = await this.getAccount();
    validateNotNullObject({ account });
    const userToken = account.userToken;
    validateNotEmptyString({ userToken });
    return userToken;
  };
}
