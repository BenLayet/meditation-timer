import ow from "ow";
import { emailVerificationStatus } from "./email-verification.state.js";

export const emailVerificationEvents = {
    sendVerificationMailRequested: {
        eventType: "sendVerificationMailRequested",
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
            status: ow.string.oneOf(Object.values(emailVerificationStatus)),
        },
        handler: (state, { status }) => ({
            ...state,
            loading: false,
            status,
        }),
    },
    sendVerificationMailScheduledTaskRequested: {
        eventType: "sendVerificationMailScheduledTaskRequested",
    },
    sendVerificationMailScheduledTaskTimeUp: {
        eventType: "sendVerificationMailScheduledTaskTimeUp",
    },
    checkStatusScheduledTaskRequested: {
        eventType: "checkStatusScheduledTaskRequested",
    },
    checkStatusScheduledTaskTimeUp: {
        eventType: "checkStatusScheduledTaskTimeUp",
    },
    retryRequested: {
        eventType: "retryRequested",
        handler: (state) => ({
            ...state,
            loading: true
        }),
    },
    refreshRequested: {
        eventType: "refreshRequested",
        handler: (state) => ({
            ...state,
            loading: true
        }),
    },
    resetRequested: {
        eventType: "resetRequested",
        handler: (state) => ({
            ...state,
            loading: true
        }),
    },
};