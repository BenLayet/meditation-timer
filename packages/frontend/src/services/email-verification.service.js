import {
  emailVerificationStatus,
  validateEmailVerification,
} from "domain/src/models/email-verification.model.js";
import { validateNotEmptyString } from "domain/src/models/not-null.validator.js";

export class EmailVerificationService {
  constructor(keyValueStorageService, emailVerificationApi) {
    this.keyValueStorageService = keyValueStorageService;
    this.emailVerificationApi = emailVerificationApi;
  }

  async createEmailVerification(email) {
    validateNotEmptyString({ email });
    const emailVerification =
      await this.emailVerificationApi.createEmailVerification(email);
    await this.storeLocalEmailVerification(emailVerification);
    return emailVerification;
  }

  async refreshEmailVerificationRequested() {
    let emailVerification = await this.loadLocalEmailVerification();
    switch (emailVerification.status) {
      case emailVerificationStatus.NOT_REQUESTED:
        emailVerification =
          await this.emailVerificationApi.createEmailVerification(
            emailVerification.email,
          );
        break;
      case emailVerificationStatus.REQUESTED:
        emailVerification =
          await this.retrieveEmailVerification(emailVerification);
        break;
      case emailVerificationStatus.VERIFIED:
      case emailVerificationStatus.EXPIRED:
        await this.deleteLocalEmailVerification();
        break;
      default:
        console.error("Unknown email verification status", status);
        break;
    }
    await this.storeLocalEmailVerification(emailVerification);
    return emailVerification;
  }

  async retrieveEmailVerification(emailVerification) {
    try {
      const remoteEmailVerification =
        await this.emailVerificationApi.retrieveEmailVerification(
          emailVerification.uuid,
          emailVerification.retrieveToken,
        );
      if (remoteEmailVerification.status === emailVerificationStatus.VERIFIED) {
        await this.deleteLocalEmailVerification();
      }

      //overwrite status and tokens with remote values
      emailVerification = { ...emailVerification, ...remoteEmailVerification };
    } catch (error) {
      if (error.cause === emailVerificationStatus.EXPIRED) {
        emailVerification.status = emailVerificationStatus.EXPIRED;
        await this.deleteLocalEmailVerification();
      } else {
        throw error;
      }
    }
    return emailVerification;
  }

  async deleteLocalEmailVerification() {
    await this.keyValueStorageService.delete("emailVerification");
  }

  async storeLocalEmailVerification(emailVerification) {
    validateEmailVerification(emailVerification);
    if (
      emailVerification.status === emailVerificationStatus.REQUESTED ||
      emailVerification.status === emailVerificationStatus.NOT_REQUESTED
    ) {
      await this.keyValueStorageService.set(
        "emailVerification",
        emailVerification,
      );
    }
  }

  async loadLocalEmailVerification() {
    const emailVerification =
      await this.keyValueStorageService.get("emailVerification");
    validateEmailVerification(emailVerification);
    return emailVerification;
  }
}
