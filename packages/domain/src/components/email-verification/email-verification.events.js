import ow from "ow";
import { emailVerificationStatus } from "./email-verification.state.js";

export const emailVerificationEvents = {
    sendActivationMailRequested: {
        eventType: "sendActivationMailRequested",
    },
    checkStatusRequested: {
        eventType: "checkStatusRequested",
        handler: (state) => ({
            ...state,
            loading: true,
        }),
    },
    checkStatusCompleted: {
        eventType: "checkStatusCompleted",
        payloadShape: {
            status: ow.string.oneOf(Object.values(emailVerificationStatus))
        },
        handler: (state, { status }) => ({
            ...state,
            loading: false,
            status,
        }),
    },
    /*
    activationMailSent: {
        eventType: "verificationRequestSent",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state, { email }) => ({
            ...state,
            status: 'PENDING_ACTIVATION',
        }),
    },
    activationMailSent: {
        eventType: "verificationRequestSent",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state, { email }) => ({
            ...state,
            status: 'PENDING_ACTIVATION',
        }),
    },
    cancelRequested: {
        eventType: "cancelRequested",
        handler: (state) => ({
            ...state,
            loading: false,
            status: 'NOT_REQUESTED',
        }),
    },
    sendEmailActivationRequested: {
        eventType: "sendEmailActivationRequested",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state) => ({
            ...state,
            loading: true,
        }),
    },
    sendEmailActivationFailed: {
        eventType: "sendEmailActivationFailed",
        payloadShape: {
            errorMessage: ow.string,
        },
        handler: (state, {errorMessage}) => ({
            ...state,
            status: 'ACTIVATION_MAIL_FAILED',
            loading: false,
            errorMessage
        }),
    },
    sendEmailActivationSucceeded: {
        eventType: "sendEmailActivationSucceeded",
        payloadShape: {
            createUserToken: ow.string,
        },
        handler: (state) => ({
            ...state,
            status: 'ACTIVATION_MAIL_SENT',
            loading: false,
        }),
    },
    scheduledCreateUserRequested: {
        eventType: "scheduledCreateUserRequested",
    },
    scheduledCreateUserTimeUp: {
        eventType: "scheduledCreateUserTimeUp",
    },
    createUserRequested: {
        eventType: "createUserRequested",
        payloadShape: {
        },
        handler: (state) => ({
            ...state,
            loading: true,
        }),
    },
    createUserSucceeded: {
        eventType: "createUserSucceeded",
        payloadShape: {
            userToken: ow.string,
        },
    },
    createUserFailed: {
        eventType: "createUserFailed",
        handler: (state) => ({
            ...state,
            loading: false,
        }),
    },
    unlinkingRequested: {
        eventType: "unlinkingRequested", //TODO generate new device id
        handler: (state) => ({
            ...state,
            loading: false,
            status: 'ANONYMOUS',
            email: null,
        }),
    },
    emailVerificationFetchRequested: {
        eventType: "emailVerificationFetchRequested",
        handler: (state) => ({
            ...state,
            loading: true,
        }),
    },
    emailVerificationFetchSucceeded: {
        eventType: "emailVerificationFetchSucceeded",
        payloadShape: {
            email: ow.string.email,
            status: ow.string.oneOf(['ANONYMOUS', 'PENDING_ACTIVATION', 'ACTIVATED']),
        },
        handler: (state, { email, status }) => ({
            ...state,
            loading: false,
            email,
            status,
        }),
    },  
    */
};