import { accountEvents } from "./account.events.js";

export const accountChainedEvents = [
    {
        onEvent: accountEvents.emailProvided,
        thenDispatch: accountEvents.sendEmailActivationRequested,
    },
    {
        onEvent: accountEvents.scheduledCreateUserTimeUp,
        thenDispatch: accountEvents.createUserRequested,
    },
    {
        onEvent: accountEvents.createUserFailed,
        thenDispatch: accountEvents.scheduledCreateUserRequested,
    },
];