import {
    meditationSessionCompleted,
    meditationSessionFinished,
    meditationSessionStopRequested
} from "./meditation-session.events.js";

export const meditationSessionChainedEvents = [
    {
        onEvent: meditationSessionCompleted,
        thenDispatch: meditationSessionFinished
    },
    {
        onEvent: meditationSessionStopRequested,
        thenDispatch: meditationSessionFinished
    },
];
