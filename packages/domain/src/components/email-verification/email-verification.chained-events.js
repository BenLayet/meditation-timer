import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
    /*
    {
        onEvent: emailVerificationEvents.newEmailProvided,
        thenDispatch: emailVerificationEvents.sendEmailActivationRequested,
    },
    {
        onEvent: emailVerificationEvents.newEmailProvided,
        thenDispatch: emailVerificationEvents.emailSet,
    },
    {
        onEvent: emailVerificationEvents.scheduledCreateUserTimeUp,
        thenDispatch: emailVerificationEvents.createUserRequested,
    },
    {
        onEvent: emailVerificationEvents.createUserFailed,
        thenDispatch: emailVerificationEvents.scheduledCreateUserRequested,
    },
    */
];