import { emailVerificationStatus } from "../../models/email-verification.model.js";
export const EMAIL_VERIFICATION_INITIAL_STATE = {
  status: emailVerificationStatus.NOT_REQUESTED,
  loading: false,
};
