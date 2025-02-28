import {
    actualMeditationCompleted,
    actualMeditationResetRequested,
    actualMeditationStartRequested,
    actualMeditationStopped,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";
import {
    actualMeditationSelectors,
    actualMeditationSelectors as actualMediationSelectors
} from "./actual-meditation.selectors.js";

const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(actualMeditationTimerTicked(currentTimeInSeconds)));
const dispatchCompletedIfTimeIsUp = ({state, dispatch}) =>
    actualMediationSelectors.isTimeUp(state) && dispatch(actualMeditationCompleted());

const saveMeditation = (meditationRepository) =>
    ({state}) =>
        meditationRepository.saveMeditation(actualMeditationSelectors.meditationToSave(state));

const TIMER_NAME = 'actualMeditation';
export const actualMeditationEffects = ({gongService, tickingService, meditationRepository}) => [
    {
        onEvent: actualMeditationStartRequested,
        then: gongService.play,
        cleanUp: gongService.stop
    },
    {
        onEvent: actualMeditationCompleted,
        then: gongService.play,
        cleanUp: gongService.stop
    },
    {
        onEvent: actualMeditationStartRequested,
        then: startTicking(tickingService),
        cleanUp: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: actualMeditationTimerTicked,
        then: dispatchCompletedIfTimeIsUp,
    },
    {
        onEvent: actualMeditationCompleted,
        then: ({dispatch}) => dispatch(actualMeditationStopped())
    },
    {
        onEvent: actualMeditationResetRequested,
        then: ({dispatch}) => dispatch(actualMeditationStopped())
    },
    {
        onEvent: actualMeditationStopped,
        then: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: actualMeditationCompleted,
        then: saveMeditation(meditationRepository),
    },
];
