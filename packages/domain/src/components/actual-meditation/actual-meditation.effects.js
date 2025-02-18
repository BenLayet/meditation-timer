import {
    actualMeditationCompleted, actualMeditationResetRequested,
    actualMeditationStartRequested,
    actualMeditationStopped,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";
import {actualMeditationSelectors as actualMediationSelectors} from "./actual-meditation.selectors.js";

export const actualMeditationEffects = ({gongService, tickingService}) => [
    {
        onEvent: actualMeditationStartRequested,
        then: () => gongService.play(),
        cleanUp: () => gongService.stop()
    },
    {
        onEvent: actualMeditationCompleted,
        then: () => gongService.play(),
        cleanUp: () => gongService.stop()
    },
    {
        onEvent: actualMeditationStartRequested,
        then: ({dispatch}) => tickingService
            .startTicking(currentTimeInSeconds => dispatch(actualMeditationTimerTicked(currentTimeInSeconds))),
        cleanUp: () => tickingService.stopTicking(),
    },
    {
        onEvent: actualMeditationTimerTicked,
        then: ({state, dispatch}) => {
            if (actualMediationSelectors.isTimeUp(state)) {
                dispatch(actualMeditationCompleted());
            }
        }
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
        then: () => tickingService.stopTicking()
    }
];
