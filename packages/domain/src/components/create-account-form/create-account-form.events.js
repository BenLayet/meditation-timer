import ow from "ow";
import { getErrorCodes } from "../../models/account.model.js";

export const createAccountFormEvents = {
  formSubmitted: {
    eventType: "formSubmitted",
    handler: (state, { login }) => ({
      ...state,
      login,
      loading: true,
    }),
    isNewCycle: true,
  },
  createAccountSucceeded: {
    eventType: "createAccountSucceeded",
    payloadShape: {
      userToken: ow.string,
    },
    handler: (state) => ({
      ...state,
      loading: false,
    }),
  },
  createAccountFailed: {
    eventType: "createAccountFailed",
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
