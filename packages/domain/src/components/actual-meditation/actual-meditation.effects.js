import {actualMeditationEvents} from "./actual-meditation.events.js";
import {actualMeditationSelectors} from "./actual-meditation.selectors.js";

const startTicking = tickingService => ({dispatch}) => tickingService
    .startTicking(TIMER_NAME, currentTimeInSeconds => dispatch(actualMeditationEvents.timerTicked, {currentTimeInSeconds}));

const saveMeditation = (meditationRepository) =>
    async ({state, dispatch}) => {
        try {
            await meditationRepository.saveMeditation(actualMeditationSelectors.meditationToSave(state));
            dispatch(actualMeditationEvents.saveSucceeded);
        } catch (error) {
            console.error(error);
            dispatch(actualMeditationEvents.saveFailed, {error});
        }
    }

const TIMER_NAME = 'actualMeditation';
export const actualMeditationEffects = ({gongService, tickingService, meditationRepository}) => [
    {
        onEvent: actualMeditationEvents.startRequested,
        then: gongService.play,
        cleanUp: gongService.stop
    },
    {
        onEvent: actualMeditationEvents.completed,
        then: gongService.play,
        cleanUp: gongService.stop
    },
    {
        onEvent: actualMeditationEvents.stopRequested,
        then: gongService.stop
    },
    {
        onEvent: actualMeditationEvents.startRequested,
        then: startTicking(tickingService),
        cleanUp: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: actualMeditationEvents.stopped,
        then: tickingService.stopTicking(TIMER_NAME),
    },
    {
        onEvent: actualMeditationEvents.saveRequested,
        then: saveMeditation(meditationRepository),
    },
];
