import ow from "ow";
import {
  getErrorCodes,
  hasError,
  loginRegex,
} from "../../models/account.model.js";
import { createAccountFormInitialState } from "./create-account-form.state.js";

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
  createAccountRequested: {
    eventType: "createAccountRequested",
    payloadShape: {
      login: ow.string.matches(loginRegex),
    },
  },
  createAccountSucceeded: {
    eventType: "createAccountSucceeded",
    payloadShape: {
      userToken: ow.string,
      login: ow.string.matches(loginRegex),
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
      isValidationRequested:
        state.isValidationRequested && hasError(loginInputValue),
      hasLoginInputChanged: true,
      errorCodes: getErrorCodes(loginInputValue),
    }),
    isNewCycle: true,
  },
  loginInputCompleted: {
    eventType: "loginInputCompleted",
    isNewCycle: true,
  },
  validationRequested: {
    eventType: "validationRequested",
    handler: (state) => ({
      ...state,
      isValidationRequested: true,
      hasLoginInputChanged: false,
    }),
  },
  resetRequested: {
    eventType: "resetRequested",
    handler: () => createAccountFormInitialState,
  },
};
