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
    const emailVerification =
        await this.emailVerificationApi.createEmailVerification(email);
    if (emailVerification.status === emailVerificationStatus.REQUESTED) {
      await this.keyValueStorageService.set(
          "retrieveEmailVerificationToken",
          emailVerification.retrieveEmailVerificationToken
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
}
