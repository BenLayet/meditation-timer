import ow from "ow";
import { getErrorCodes } from "../../models/account.model.js";

export const loginFormEvents = {
  formSubmitted: {
    eventType: "formSubmitted",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true,
  },
  loginSucceeded: {
    eventType: "loginSucceeded",
    payloadShape: {
      userToken: ow.string,
    },
  },
  loginFailed: {
    eventType: "loginFailed",
    payloadShape: {
      error: ow.any,
      errorCodes: ow.array,
    },
    handler: (state, { errorCodes }) => ({
      ...state,
      loading: false,
      errorCodes,
    }),
  },
  loginInputChanged: {
    eventType: "loginInputChanged",
    payloadShape: {
      loginInputValue: ow.string,
    },
    handler: (state, { loginInputValue }) => ({
      ...state,
      loginInputValue,
      isValidationRequested: false,
      errorCodes: getErrorCodes(loginInputValue),
    }),
    isNewCycle: true,
  },
  validationRequested: {
    eventType: "validationRequested",
    handler: (state) => ({
      ...state,
      isValidationRequested: true,
    }),
    isNewCycle: true,
  },
};
