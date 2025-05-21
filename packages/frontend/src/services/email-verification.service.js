import { emailVerificationStatus } from "domain/src/components/email-verification/email-verification.state";

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
        status = await this.requestEmailVerification();
        break;
      case emailVerificationStatus.REQUESTED:
        status = await this.emailVerificationApi.checkStatus();
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

  async requestEmailVerification() {
    const email = await this.keyValueStorageService.get("email");
    await this.keyValueStorageService.set(
      "emailVerificationStatus",
      emailVerificationStatus.NOT_REQUESTED
    );
    const result =
      await this.emailVerificationApi.requestEmailVerification(email);
    if (result.success) {
      await this.keyValueStorageService.set(
        "checkStatusToken",
        result.checkStatusToken
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
    const checkStatusToken =
      await this.keyValueStorageService.get("checkStatusToken");
    const result =
      await this.emailVerificationApi.checkStatus(checkStatusToken);
    let status;
    if (result.success) {
      await this.keyValueStorageService.set("userToken", result.userToken);
      await this.keyValueStorageService.delete("checkStatusToken");
      await this.keyValueStorageService.delete("emailVerificationStatus");
      status = emailVerificationStatus.VERIFIED;
    } else {
      // expired or requested
      status = emailVerificationStatus[result.status];
      validateNotNull({ status });
      await this.keyValueStorageService.set("emailVerificationStatus", status);
    }
    return status;
  }
}
