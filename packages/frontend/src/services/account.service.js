import { FunctionalError } from '../errors/functional-error.js'
import { errorCodes } from 'domain/src/errors/error-codes.js'
import { validateNotEmptyString, validateNotNullObject } from 'domain/src/lib/assert/not-null.validator.js'
import { accountStatus as statusCodes } from 'domain/src/models/account.model.js'

export class AccountService {
  constructor (keyValueStorageService) {
    this.keyValueStorageService = keyValueStorageService
  }

  getAccount = async () =>
    this.keyValueStorageService.get('account')
  getAccountStatus = async () => {
    const account = await this.getAccount()
    return account ? account.status : statusCodes.ANONYMOUS
  }

  isAuthenticated = async () =>
    (await this.getAccountStatus()) === statusCodes.AUTHENTICATED

  getUserToken = async () => {
    if (!(await this.isAuthenticated())) {
      throw new FunctionalError(
        'Cannot get user token',
        errorCodes.USER_NOT_AUTHENTICATED,
      )
    }
    const account = await this.getAccount()
    validateNotNullObject({ account })
    const userToken = account.userToken
    validateNotEmptyString({ userToken })
    return userToken
  }
}
