import ow from "ow";

export const accountEvents = {
    emailProvided: {
        eventType: "emailProvided",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state, { email }) => ({
            ...state,
            email,
            status: 'PENDING_ACTIVATION',
        }),
    },
    resetRequested: {
        eventType: "resetRequested",
        handler: (state) => ({
            ...state,
            errorMessage: null,
            loading: false,
            email: null,
            status: 'ANONYMOUS',
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
    sendEmailActivationSuccceeded: {
        eventType: "sendEmailActivationSuccceeded",
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
        eventType: "scheduledCreateUserTimeUp"
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
    createUserSucceededed: {
        eventType: "createUserSucceededed",
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
};