import { accountEvents } from "./account.events.js";

export const accountChainedEvents = [
    {
        onEvent: accountEvents.emailProvided,
        thenDispatch: accountEvents.emailActivationLinkRequested,
    },
];