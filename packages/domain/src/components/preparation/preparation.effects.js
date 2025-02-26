import {
    preparationCompleted,
    preparationStartRequested,
    preparationStopRequested,
    preparationTimerTicked
} from "./preparation.events.js";
import {preparationSelectors} from "./preparation.selectors.js";

const TIMER_NAME = 'preparation';
const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME)(currentTimeInSeconds => dispatch(preparationTimerTicked(currentTimeInSeconds)));
const dispatchCompletedIfTimeIsUp = ({state, dispatch, payload}) =>
    preparationSelectors.isTimeUp(state) && dispatch(preparationCompleted(payload.currentTimeInSeconds));


export const preparationEffects = ({tickingService}) => [
    {
        onEvent: preparationStartRequested,
        then: startTicking(tickingService),
        cleanUp: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: preparationTimerTicked,
        then: dispatchCompletedIfTimeIsUp,
    },
    {
        onEvent: preparationCompleted,
        then: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: preparationStopRequested,
        then: tickingService.stopTicking(TIMER_NAME),
    },
];
