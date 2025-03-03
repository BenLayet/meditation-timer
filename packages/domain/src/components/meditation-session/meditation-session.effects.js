import {
    meditationSessionCompleted,
    meditationSessionFinished,
    meditationSessionStartRequested, meditationSessionStopRequested
} from "./meditation-session.events.js";

export const meditationSessionEffects = ({wakeLockService}) => [
    {
        onEvent: meditationSessionStartRequested,
        then: wakeLockService.requestWakeLock
    },
    {
        onEvent: meditationSessionCompleted,
        then: ({dispatch}) => dispatch(meditationSessionFinished())
    },
    {
        onEvent: meditationSessionStopRequested,
        then: ({dispatch}) => dispatch(meditationSessionFinished())
    },
    {
        onEvent: meditationSessionFinished,
        then: wakeLockService.releaseWakeLock
    },
];
