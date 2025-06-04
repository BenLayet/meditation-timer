import { accountStatus } from "../../models/account.model.js";

export const ACCOUNT_INITIAL_STATE = {
  email: null,
  status: accountStatus.ANONYMOUS,
  loading: false,
};
