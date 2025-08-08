import { loginErrorCode } from "../../models/account.model.js";

export const loginFormInitialState = {
  controls: {
    login: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [loginErrorCode.LOGIN_MISSING],
    },
    password: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [loginErrorCode.PASSWORD_MISSING],
    },
  },
  postProcessingErrorCodes: [],
  isSubmitted: false,
};
