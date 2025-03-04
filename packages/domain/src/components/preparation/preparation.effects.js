import {
    preparationCompleted,
    preparationFinished,
    preparationStartRequested,
    preparationTimerTicked
} from "./preparation.events.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {morePreparationTimeRequested} from "../meditation-settings/meditation-settings.events.js";

const TIMER_NAME = 'preparation';
const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(preparationTimerTicked(currentTimeInSeconds)));
const stopTicking = tickingService => tickingService.stopTicking(TIMER_NAME);
const restartTicking = tickingService => ({dispatch}) => {
    stopTicking(tickingService)();
    startTicking(tickingService)({dispatch});
}
const dispatchCompletedIfTimeIsUp = ({state, dispatch, payload}) =>
    preparationSelectors.isTimeUp(state) && dispatch(preparationCompleted(payload.currentTimeInSeconds));


export const preparationEffects = ({tickingService}) => [
    {
        onEvent: preparationStartRequested,
        then: startTicking(tickingService),
        cleanUp: stopTicking(tickingService),
    },
    {
        onEvent: preparationTimerTicked,
        then: dispatchCompletedIfTimeIsUp,
    },
    {
        onEvent: preparationCompleted,
        then: ({dispatch}) => dispatch(preparationFinished())
    },
    {
        onEvent: preparationFinished,
        then: stopTicking(tickingService),
    },
    {
        onEvent: morePreparationTimeRequested,
        then: restartTicking(tickingService), //avoid flickering when adding more time
    }
];
