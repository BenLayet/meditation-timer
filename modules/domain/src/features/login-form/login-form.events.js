import { z } from "zod";
import {
  getLoginInputStaticErrorCodes,
  getPasswordInputStaticErrorCodes,
  isLoginInputInvalid,
  isPasswordInputInvalid,
  loginRegex,
  passwordRegex,
} from "../../models/account.model.js";
import { loginFormInitialState } from "./login-form.state.js";

const accountShape = z.object({
  login: z.string().regex(loginRegex),
  userToken: z.string().optional(),
});

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
    payloadShape: z.object({
      login: z.string().regex(loginRegex),
      password: z.string().regex(passwordRegex),
    }),
  },
  loginSucceeded: {
    eventType: "loginSucceeded",
    payloadShape: z.object({ account: accountShape }),
  },
  loginFailed: {
    eventType: "loginFailed",
    payloadShape: z.object({
      error: z.unknown(),
      errorCodes: z.array(z.unknown()),
    }),
    handler: (state, { errorCodes }) => ({
      ...state,
      isSubmitted: false,
      postProcessingErrorCodes: errorCodes,
    }),
  },
  loginInputChanged: {
    eventType: "loginInputChanged",
    payloadShape: z.object({ loginInputValue: z.string() }),
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
    payloadShape: z.object({ passwordInputValue: z.string() }),
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
