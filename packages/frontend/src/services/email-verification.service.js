import {emailVerificationStatus, validateEmailVerification} from "domain/src/models/email-verification.model.js";
import {validateNotEmptyString} from "domain/src/models/not-null.validator.js";

export class EmailVerificationService {
  constructor(keyValueStorageService, emailVerificationApi) {
    this.keyValueStorageService = keyValueStorageService;
    this.emailVerificationApi = emailVerificationApi;
  }

  async createEmailVerification(email) {
    validateNotEmptyString({email});
    const emailVerification =
        await this.emailVerificationApi.createEmailVerification(email);
    validateEmailVerification(emailVerification);
    await this.keyValueStorageService.set(
        "emailVerification",
        emailVerification
    );
    return emailVerification;
  }

  async getEmailVerification(email) {
    let emailVerification = await this.keyValueStorageService.get("emailVerification");
    if (!emailVerification) {
      emailVerification = {email, status: emailVerificationStatus.NOT_REQUESTED};
    }
    validateEmailVerification(emailVerification);
    let status = emailVerification.status;
    switch (status) {
      case emailVerificationStatus.NOT_REQUESTED:
        emailVerification = await this.createEmailVerification(email);
        break;
      case emailVerificationStatus.REQUESTED:
        try {
          emailVerification = await this.emailVerificationApi.getEmailVerification(emailVerification.uuid, emailVerification.retrieveToken);
        } catch (error) {
          if (error.status === emailVerificationStatus.EXPIRED) {
            emailVerification.status = emailVerificationStatus.EXPIRED;
          } else {
            console.error("Unexpected error retrieving email verification", error);
            throw error;
          }
        }
        await this.keyValueStorageService.set(
            "emailVerification",
            emailVerification
        );
        break;
      case emailVerificationStatus.VERIFIED:
      case emailVerificationStatus.EXPIRED:
        // Do nothing, return the current status
        break;
      default:
        console.error("Unknown email verification status", status);
        break;
    }
    return emailVerification;
  }

}
