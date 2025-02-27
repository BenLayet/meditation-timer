import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

export const actualMeditationStartRequested =
    createEventFactory('actualMeditationStartRequested', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });
export const actualMeditationResetRequested = createEventFactory('actualMeditationResetRequested');

export const actualMeditationCompleted = createEventFactory('actualMeditationCompleted');
export const actualMeditationStopped = createEventFactory('actualMeditationStopped');

export const actualMeditationTimerTicked =
    createEventFactory('actualMeditationTimerTicked', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });

export const actualMeditationMoreTimeRequested = createEventFactory('actualMeditationMoreTimeRequested');
export const actualMeditationLessTimeRequested = createEventFactory('actualMeditationLessTimeRequested');

