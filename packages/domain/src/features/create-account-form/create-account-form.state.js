import { createAccountErrorCodes } from "../../models/account.model.js";

export const createAccountFormInitialState = {
  controls: {
    login: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [createAccountErrorCodes.LOGIN_MISSING],
    },
    password: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [createAccountErrorCodes.PASSWORD_MISSING],
    },
  },
  postProcessingErrorCodes: [],
  isSubmitted: false,
};
