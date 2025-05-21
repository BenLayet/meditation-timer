import {emailVerificationStatus} from "domain/src/models/email-verification.model.js";
import {validateNotEmptyString} from "domain/src/models/not-null.validator.js";

export class EmailVerificationService {
  constructor(keyValueStorageService, emailVerificationApi) {
    this.keyValueStorageService = keyValueStorageService;
    this.emailVerificationApi = emailVerificationApi;
  }

  async checkStatus() {
    let status =
      (await this.keyValueStorageService.get("emailVerificationStatus")) ??
      emailVerificationStatus.NOT_REQUESTED;
    switch (status) {
      case emailVerificationStatus.NOT_REQUESTED:
        status = await this.verifyStoredEmail();
        break;
      case emailVerificationStatus.REQUESTED:
        const emailVerificationUuid =
            await this.keyValueStorageService.get("emailVerificationUuid");
        const retrieveEmailVerificationToken =
            await this.keyValueStorageService.get("retrieveEmailVerificationToken");
        const result = await this.emailVerificationApi.getEmailVerification(emailVerificationUuid, retrieveEmailVerificationToken);
        if (result.isVerified) {
          status = emailVerificationStatus.VERIFIED;
          this.keyValueStorageService.set("userToken", result.userToken);
        }
        break;
      case emailVerificationStatus.VERIFIED:
      case emailVerificationStatus.EXPIRED:
        // Do nothing, return the current status
        break;
      default:
        console.error("Unknown email verification status", status);
        break;
    }
    await this.keyValueStorageService.set("emailVerificationStatus", status);
    return status;
  }

  async verifyStoredEmail() {
    const email = await this.keyValueStorageService.get("email");
    validateNotEmptyString(email);
    await this.keyValueStorageService.set(
      "emailVerificationStatus",
      emailVerificationStatus.NOT_REQUESTED
    );
    const result =
        await this.emailVerificationApi.verifyEmail(email);
    if (result.success) {
      await this.keyValueStorageService.set(
          "retrieveEmailVerificationToken",
          result.retrieveEmailVerificationToken
      );
      await this.keyValueStorageService.set(
        "emailVerificationStatus",
        emailVerificationStatus.REQUESTED
      );
      return emailVerificationStatus.REQUESTED;
    } else {
      return emailVerificationStatus.NOT_REQUESTED;
    }
  }
  async checkRemoteStatus() {
    const retrieveEmailVerificationToken =
        await this.keyValueStorageService.get("retrieveEmailVerificationToken");
    const emailVerificationUuid =
        await this.keyValueStorageService.get("emailVerificationUuid");
    const emailVerification =
        await this.emailVerificationApi.getEmailVerification(emailVerificationUuid, retrieveEmailVerificationToken);
    if (emailVerification.status === emailVerificationStatus.VERIFIED) {
      await this.keyValueStorageService.set("userToken", emailVerification.userToken);
      await this.keyValueStorageService.delete("retrieveEmailVerificationToken");
      //TODO store directly object emailVerification
      await this.keyValueStorageService.delete("emailVerificationStatus");
      await this.keyValueStorageService.delete("emailVerificationUuid");
    } else {
      await this.keyValueStorageService.set("emailVerificationStatus", emailVerification.status);
    }
    return emailVerification.status;
  }
}
