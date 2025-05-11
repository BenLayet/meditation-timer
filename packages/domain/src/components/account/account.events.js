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
            email: ow.string.email,
        },
        handler: (state) => ({
            ...state,
            status: 'ACTIVATION_MAIL_SENT',
            loading: false,
        }),
    },
    accountFetchRequested: {
        eventType: "accountFetchRequested",
        handler: (state) => ({
            ...state,
            loading: true,
        }),
    },
    accountFetchSucceeded: {
        eventType: "accountFetchSucceeded",
        payloadShape: {
            email: ow.string.email,
            status: ow.string.oneOf(['ANONYMOUS', 'ACTIVATION_MAIL_SENT', 'ACTIVATION_MAIL_FAILED', 'ACTIVATED']),
            devices: ow.optional.array,
        },
        handler: (state, {email, status}) => ({
            ...state,
            email,
            status,
            loading: false,
        }),
    },
    accountFetchFailed: {
        eventType: "accountFetchFailed",
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