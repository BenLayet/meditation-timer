import {preparationStarted} from "./preparation/preparation.events.js";
import ow from "ow";
import {MEDITATION_SESSION_STARTED, MEDITATION_SESSION_STOPPED} from "./meditation-session.events.js";
import {actualMeditationEffects} from "./actual-meditation/actual-meditation.effects.js";
import {timerEffects} from "../timer/timer.effects.js";
import {timerStartRequested, timerStopRequested} from "../timer/timer.events.js";

const startsPreparation = (dispatch) => async (payload) => {
    ow(payload, ow.object.exactShape({
        currentTimestampInMs: ow.number.integer.positive
    }));
    dispatch(preparationStarted(payload.currentTimestampInMs));
};
export const meditationSessionEffects = (dispatch, wakeLockService, gongService, tickingService) => [
    {
        triggerEventType: MEDITATION_SESSION_STARTED,
        eventOccurred: startsPreparation(dispatch)
    },
    {
        triggerEventType: MEDITATION_SESSION_STARTED,
        eventOccurred: () => dispatch(timerStartRequested())
    },
    {
        triggerEventType: MEDITATION_SESSION_STOPPED,
        eventOccurred: () => dispatch(timerStopRequested())
    },
    {
        triggerEventType: MEDITATION_SESSION_STARTED,
        eventOccurred: () => wakeLockService.requestWakeLock()
    },
    {
        triggerEventType: MEDITATION_SESSION_STOPPED,
        eventOccurred: () => wakeLockService.releaseWakeLock()
    },
    ...actualMeditationEffects(gongService),
    ...timerEffects(dispatch, tickingService),
    ...timerEffects(dispatch, tickingService)
];
