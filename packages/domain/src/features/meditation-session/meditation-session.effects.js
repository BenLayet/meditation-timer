import {meditationSessionEvents} from "./meditation-session.events.js";

export const meditationSessionEffects = ({wakeLockService}) => [
    {
        onEvent: meditationSessionEvents.startRequested,
        then: wakeLockService.requestWakeLock
    },
    {
        onEvent: meditationSessionEvents.finished,
        then: wakeLockService.releaseWakeLock
    },
];
