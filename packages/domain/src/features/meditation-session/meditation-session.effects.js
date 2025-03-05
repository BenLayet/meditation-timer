import {meditationSessionFinished, meditationSessionStartRequested} from "./meditation-session.events.js";

export const meditationSessionEffects = ({wakeLockService}) => [
    {
        onEvent: meditationSessionStartRequested,
        then: wakeLockService.requestWakeLock
    },
    {
        onEvent: meditationSessionFinished,
        then: wakeLockService.releaseWakeLock
    },
];
