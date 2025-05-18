export const accountStatus = {
  ANONYMOUS: "ANONYMOUS",
  PENDING_VERIFICATION: "PENDING_VERIFICATION",
  AUTHENTICATED: "AUTHENTICATED",
}

export const ACCOUNT_INITIAL_STATE = {
  email: null,
  status: accountStatus.ANONYMOUS,
  loading: false
};