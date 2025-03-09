import {preparationEvents} from "./preparation.events.js";
import {preparationSelectors} from "./preparation.selectors.js";

const TIMER_NAME = 'preparation';
const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(preparationEvents.timerTicked, {currentTimeInSeconds}));
const stopTicking = tickingService => tickingService.stopTicking(TIMER_NAME);
const restartTicking = tickingService => ({dispatch}) => {
    stopTicking(tickingService)();
    startTicking(tickingService)({dispatch});
}
const dispatchCompletedIfTimeIsUp = ({state, dispatch, payload}) =>
    preparationSelectors.isTimeUp(state) && dispatch(preparationEvents.completed, payload);


export const preparationEffects = ({tickingService}) => [
    {
        onEvent: preparationEvents.startRequested,
        then: startTicking(tickingService),
        cleanUp: stopTicking(tickingService),
    },
    {
        onEvent: preparationEvents.timerTicked,
        then: dispatchCompletedIfTimeIsUp,
    },
    {
        onEvent: preparationEvents.completed,
        then: ({dispatch}) => dispatch(preparationEvents.finished)
    },
    {
        onEvent: preparationEvents.finished,
        then: stopTicking(tickingService),
    },
    {
        onEvent: preparationEvents.moreTimeRequested,
        then: restartTicking(tickingService), //avoid flickering when adding more time
    }
];
