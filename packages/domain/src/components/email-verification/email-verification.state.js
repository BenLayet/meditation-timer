export const emailVerificationStatus = {
  NOT_REQUESTED: "NOT_REQUESTED",
  REQUESTED: "REQUESTED",
  VERIFIED: "VERIFIED",
  EXPIRED: "EXPIRED",
}
export const EMAIL_VERIFICATION_INITIAL_STATE = {
  status: emailVerificationStatus.NOT_REQUESTED, 
  loading: false,
};
