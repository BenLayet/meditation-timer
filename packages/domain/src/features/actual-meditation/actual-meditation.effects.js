import {
    actualMeditationCompleted,
    actualMeditationCancelRequested,
    actualMeditationSaveFailed,
    actualMeditationSaveRequested,
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested,
    actualMeditationStopped,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";
import {
    actualMeditationSelectors,
    actualMeditationSelectors as actualMediationSelectors
} from "./actual-meditation.selectors.js";

const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(actualMeditationTimerTicked({currentTimeInSeconds})));
const dispatchCompletedIfTimeIsUp = ({state, dispatch}) =>
    actualMediationSelectors.isTimeUp(state) && dispatch(actualMeditationCompleted());

const saveMeditation = (meditationRepository) =>
    async ({state, dispatch}) => {
        try {
            await meditationRepository.saveMeditation(actualMeditationSelectors.meditationToSave(state));
            dispatch(actualMeditationSaveSucceeded());
        } catch (error) {
            console.error(error);
            dispatch(actualMeditationSaveFailed(error));
        }
    }

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
        onEvent: actualMeditationCancelRequested,
        then: gongService.stop
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
        onEvent: actualMeditationStopped,
        then: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: actualMeditationSaveRequested,
        then: saveMeditation(meditationRepository),
    },
];
