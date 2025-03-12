import {preparationEvents} from "./preparation.events.js";

const TIMER_NAME = 'preparation';
const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(preparationEvents.timerTicked, {currentTimeInSeconds}));
const stopTicking = tickingService => tickingService.stopTicking(TIMER_NAME);
const restartTicking = tickingService => ({dispatch}) => {
    stopTicking(tickingService)();
    startTicking(tickingService)({dispatch});
}


export const preparationEffects = ({tickingService}) => [
    {
        onEvent: preparationEvents.startRequested,
        then: startTicking(tickingService),
        cleanUp: stopTicking(tickingService),
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
