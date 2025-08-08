import { createAccountErrorCode } from "../../models/account.model.js";

export const createAccountFormInitialState = {
  controls: {
    login: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [createAccountErrorCode.LOGIN_MISSING],
    },
    password: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [createAccountErrorCode.PASSWORD_MISSING],
    },
  },
  postProcessingErrorCodes: [],
  isSubmitted: false,
};
