import {preparationStarted} from "./preparation/preparation.events.js";
import ow from "ow";
import {MEDITATION_SESSION_STARTED, MEDITATION_SESSION_STOPPED} from "./meditation-session.events.js";
import {actualMeditationEffects} from "./actual-meditation/actual-meditation.effects.js";

const startsPreparation = (dispatch) => async (payload) => {
    ow(payload, ow.object.exactShape({
        currentTimestampInSeconds: ow.number.integer.positive
    }));
    dispatch(preparationStarted(payload.currentTimestampInSeconds));
};

export const meditationSessionEffects = (dispatch, wakeLockService, gongService) => [
    {
        triggerEventType: MEDITATION_SESSION_STARTED,
        eventOccurred: startsPreparation(dispatch)
    },
    {
        triggerEventType: MEDITATION_SESSION_STARTED,
        eventOccurred: () => wakeLockService.requestWakeLock()
    },
    {
        triggerEventType: MEDITATION_SESSION_STOPPED,
        eventOccurred: () => wakeLockService.releaseWakeLock()
    },
    ...actualMeditationEffects(gongService)
];
