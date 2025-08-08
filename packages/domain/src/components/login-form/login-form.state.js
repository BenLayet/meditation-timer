import { loginErrorCodes } from "../../models/account.model.js";

export const loginFormInitialState = {
  controls: {
    login: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [loginErrorCodes.LOGIN_MISSING],
    },
    password: {
      value: "",
      areErrorsMarked: false,
      errorCodes: [loginErrorCodes.PASSWORD_MISSING],
    },
  },
  postProcessingErrorCodes: [],
  isSubmitted: false,
};
