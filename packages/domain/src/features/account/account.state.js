import { accountStatus } from "../../models/account.model.js";

export const ACCOUNT_INITIAL_STATE = {
  status: accountStatus.ANONYMOUS,
  loading: false,
  login: null,
  loginFormRequested: false,
  isOnline: false,
};
