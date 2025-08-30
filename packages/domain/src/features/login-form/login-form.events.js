import ow from "ow";
import {
  getLoginInputStaticErrorCodes,
  getPasswordInputStaticErrorCodes,
  isLoginInputInvalid,
  isPasswordInputInvalid,
  loginRegex,
  passwordRegex,
} from "../../models/account.model.js";
import { loginFormInitialState } from "./login-form.state.js";

const accountShape = {
  login: ow.string.matches(loginRegex),
  userToken: ow.optional.string,
};
export const loginFormEvents = {
  formSubmitted: {
    eventType: "formSubmitted",
    handler: (state) => ({
      ...state,
      isSubmitted: true,
    }),
    isNewCycle: true,
  },
  loginRequested: {
    eventType: "loginRequested",
    payloadShape: {
      login: ow.string.matches(loginRegex),
      password: ow.string.matches(passwordRegex),
    },
  },
  loginSucceeded: {
    eventType: "loginSucceeded",
    payloadShape: { account: ow.object.exactShape(accountShape) },
  },
  loginFailed: {
    eventType: "loginFailed",
    payloadShape: {
      error: ow.any,
      errorCodes: ow.array,
    },
    handler: (state, { errorCodes }) => ({
      ...state,
      isSubmitted: false,
      postProcessingErrorCodes: errorCodes,
    }),
  },
  loginInputChanged: {
    eventType: "loginInputChanged",
    payloadShape: {
      loginInputValue: ow.string,
    },
    handler: (state, { loginInputValue }) => ({
      ...state,
      controls: {
        ...state.controls,
        login: {
          value: loginInputValue,
          areErrorsMarked:
            state.controls.login.areErrorsMarked &&
            isLoginInputInvalid(loginInputValue),
          errorCodes: getLoginInputStaticErrorCodes(loginInputValue),
        },
      },
      postProcessingErrorCodes: [],
    }),
    isNewCycle: true,
  },
  passwordInputChanged: {
    eventType: "passwordInputChanged",
    payloadShape: {
      passwordInputValue: ow.string,
    },
    handler: (state, { passwordInputValue }) => ({
      ...state,
      controls: {
        ...state.controls,
        password: {
          value: passwordInputValue,
          areErrorsMarked:
            state.controls.password.areErrorsMarked &&
            isPasswordInputInvalid(passwordInputValue),
          errorCodes: getPasswordInputStaticErrorCodes(passwordInputValue),
        },
      },
      postProcessingErrorCodes: [],
    }),
    isNewCycle: true,
  },
  loginInputCompleted: {
    eventType: "loginInputCompleted",
    handler: (state) => ({
      ...state,
      controls: {
        ...state.controls,
        login: {
          ...state.controls.login,
          areErrorsMarked: true,
        },
      },
    }),
    isNewCycle: true,
  },
  passwordInputCompleted: {
    eventType: "passwordInputCompleted",
    handler: (state) => ({
      ...state,
      controls: {
        ...state.controls,
        password: {
          ...state.controls.password,
          areErrorsMarked: true,
        },
      },
    }),
    isNewCycle: true,
  },
  resetRequested: {
    eventType: "resetRequested",
    handler: () => loginFormInitialState,
  },
};
