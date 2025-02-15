import {
    TIMER_START_REQUESTED,
    TIMER_STOP_REQUESTED,
    TIMER_TICKED,
    timerStopRequested,
    timerTicked,
    timeUpReached
} from "./timer.events.js";
import {timerSelectors} from "./timer.selectors.js";
const startTimer = (dispatch, tickingService) => async () => {
    tickingService.startTicking(() => dispatch(timerTicked(Date.now())));
};
const stopTimer = (tickingService)=> async () => {
    tickingService.stopTicking()
};
const checkIfTimeIsUp =  (dispatch)=> async (payload, state) => {
    if(timerSelectors.isTimeUp(state)){
        dispatch(timerStopRequested());
        dispatch(timeUpReached());
    }
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
    {
        triggerEventType: TIMER_TICKED,
        eventOccurred: checkIfTimeIsUp(dispatch)
    },
];

