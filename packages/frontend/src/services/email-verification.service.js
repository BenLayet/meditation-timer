import {
  emailVerificationStatus,
  validateEmailVerification,
} from "domain/src/models/email-verification.model.js";
import { validateNotEmptyString } from "domain/src/lib/assert/not-null.validator.js";

export class EmailVerificationService {
  constructor(keyValueStorageService, emailVerificationApi) {
    this.keyValueStorageService = keyValueStorageService;
    this.emailVerificationApi = emailVerificationApi;
  }
  async storeNewEmailVerification(email) {
    validateNotEmptyString({ email });
    const emailVerification = {
      email,
      status: emailVerificationStatus.CREATED,
    };
    await this.storeLocalEmailVerification(emailVerification);
    return emailVerification;
  }
  async sendVerificationLink() {
    let emailVerification = await this.loadLocalEmailVerification();
    emailVerification =
      await this.emailVerificationApi.sendVerificationLink(emailVerification);
    await this.storeLocalEmailVerification(emailVerification);
  }

  async refreshStoredEmailVerification() {
    let emailVerification = await this.loadLocalEmailVerification();
    emailVerification =
      await this.emailVerificationApi.refresh(emailVerification);
    await this.storeLocalEmailVerification(emailVerification);
    return emailVerification;
  }

  deleteStoredEmailVerification = async () =>
    this.keyValueStorageService.delete("emailVerification");

  async storeLocalEmailVerification(emailVerification) {
    validateEmailVerification(emailVerification);
    if (
      emailVerification.status ===
        emailVerificationStatus.VERIFICATION_LINK_SENT ||
      emailVerification.status === emailVerificationStatus.CREATED
    ) {
      await this.keyValueStorageService.set(
        "emailVerification",
        emailVerification,
      );
    } else {
      await this.deleteStoredEmailVerification();
    }
  }

  async loadLocalEmailVerification() {
    const emailVerification =
      await this.keyValueStorageService.get("emailVerification");
    validateEmailVerification(emailVerification);
    return emailVerification;
  }
}
