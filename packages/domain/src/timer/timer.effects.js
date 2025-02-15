import {TIMER_START_REQUESTED, TIMER_STOP_REQUESTED, timerTicked} from "./timer.events.js";
const startTimer = (dispatch, tickingService) => async () => {
    tickingService.startTicking(() => dispatch(timerTicked(Date.now())));
};
const stopTimer =   (tickingService)=> async () => {
    tickingService.stopTicking()
};
export const timerEffects = (dispatch, tickingService) => [
    {
        triggerEventType: TIMER_START_REQUESTED,
        eventOccurred: startTimer(dispatch, tickingService),
        cleanUp: stopTimer
    },
    {
        triggerEventType: TIMER_STOP_REQUESTED,
        eventOccurred: stopTimer(tickingService)
    },
];

