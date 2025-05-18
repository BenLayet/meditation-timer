import { emailVerificationEvents } from "../email-verification/email-verification.events.js";
import { accountEvents } from "./account.events.js";
import { ownStateSelectors } from "./account.selectors.js";
import { ownStateSelectors as emailVerificationOwnSelectors } from "../email-verification/email-verification.selectors.js";

export const accountChainedEvents = [
    {
        onEvent: accountEvents.createAccountRequested,
        thenDispatch: {
            ...emailVerificationEvents.sendActivationMailRequested,
            childComponentPath:["emailVerification"],
        },
    },
    {
        onEvent: accountEvents.accountLoaded,
        onCondition: ({state}) => ownStateSelectors.isPendingVerification(state.ownState),
        thenDispatch: accountEvents.checkEmailVerificationStatusRequested,
    },
    {
        onEvent: accountEvents.checkEmailVerificationStatusRequested,
        thenDispatch: {
            ...emailVerificationEvents.checkStatusRequested,
            childComponentPath:["emailVerification"],
        },
    },
    {
        onEvent: {
            ...emailVerificationEvents.checkStatusCompleted,
            childComponentPath:["emailVerification"],
        },
        thenDispatch: accountEvents.checkEmailVerificationStatusCompleted,
        withPayload: ({state}) => ({
            isVerified: emailVerificationOwnSelectors.isVerified(state.children.emailVerification.ownState),
        }),
    },
];