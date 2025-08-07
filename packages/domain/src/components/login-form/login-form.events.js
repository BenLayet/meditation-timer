import ow from "ow";
import {
  getErrorCodes,
  hasError,
  loginRegex,
} from "../../models/account.model.js";
import { loginFormInitialState } from "./login-form.state.js";

export const loginFormEvents = {
  formSubmitted: {
    eventType: "formSubmitted",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true,
  },
  loginRequested: {
    eventType: "loginRequested",
    payloadShape: {
      login: ow.string.matches(loginRegex),
    },
  },
  loginSucceeded: {
    eventType: "loginSucceeded",
    payloadShape: {
      userToken: ow.string.not.empty,
      login: ow.string.matches(loginRegex),
    },
    handler: (state) => ({
      ...state,
      loading: false,
    }),
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
    handler: () => loginFormInitialState,
  },
};
