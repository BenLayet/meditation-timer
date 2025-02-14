import {ACTUAL_MEDITATION_COMPLETED, ACTUAL_MEDITATION_STARTED} from "./actual-meditation.events.js";

export const actualMeditationEffects = (gongService) => [
    {
        triggerEventType: ACTUAL_MEDITATION_STARTED,
        eventOccurred: () => gongService.play()
    },
    {
        triggerEventType: ACTUAL_MEDITATION_COMPLETED,
        eventOccurred: () => gongService.play()
    },
];
