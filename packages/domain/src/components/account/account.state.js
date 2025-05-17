export const ACCOUNT_INITIAL_STATE = {
  email: null,
  status: "ANONYMOUS", // ANONYMOUS, PENDING_ACTIVATION, ACTIVATED, ACTIVATION_MAIL_SENT, ACTIVATION_MAIL_FAILED
  loading: false,
  errorMessage: null,
};
