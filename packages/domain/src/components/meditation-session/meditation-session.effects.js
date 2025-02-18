import {meditationSessionCompleted, meditationSessionStartRequested} from "./meditation-session.events.js";

export const meditationSessionEffects = ({wakeLockService}) => [
    {
        onEvent: meditationSessionStartRequested,
        then: () => wakeLockService.requestWakeLock()
    },
    {
        onEvent: meditationSessionCompleted,
        then: () => wakeLockService.releaseWakeLock()
    },
];
