import ow from "ow";

export const accountEvents = {
    emailProvided: {
        eventType: "emailProvided",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state, { email }) => ({
            ...state,
            email
        }),
    },
    emailActivationLinkRequested: {
        eventType: "emailActivationLinkRequested",
        payloadShape: {
            email: ow.string.email,
        },
        handler: (state) => ({
            ...state,
            isEmailPendingActivation: true,
        }),
    },
    accountFetchRequested: {
        eventType: "accountFetchRequested",
        handler: (state) => ({
            ...state,
            loading: true,
            error: false
        }),
    },
    accountFetchSucceeded: {
        eventType: "accountFetchSucceeded",
        payloadShape: {
            email: ow.string.email,
            isEmailPendingActivation: ow.boolean,
            isEmailValidated: ow.boolean,
            devices: ow.optional.array,
        },
        handler: (state, {email, isEmailPendingActivation, isEmailValidated}) => ({
            ...state,
            email,
            isEmailPendingActivation,
            isEmailValidated,
            loading: false,
            error: false
        }),
    },
    accountFetchFailed: {
        eventType: "accountFetchFailed",
        handler: (state) => ({
            ...state,
            loading: false,
            error: true
        }),
    },
    unlinkEmailRequested: {
        eventType: "unlinkEmailRequested"
        //TODO
    },
};