import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

export const actualMeditationStartRequested =
    createEventFactory('actualMeditationStartRequested', ({durationInMinutes, currentTimeInSeconds}) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        ow(durationInMinutes, ow.number.integer.positive);
        return {currentTimeInSeconds, durationInMinutes};
    });
export const actualMeditationCancelRequested = createEventFactory('actualMeditationCancelRequested');
export const actualMeditationCompleted = createEventFactory('actualMeditationCompleted');
export const actualMeditationStopped = createEventFactory('actualMeditationStopped');

export const actualMeditationTimerTicked =
    createEventFactory('actualMeditationTimerTicked', ({currentTimeInSeconds}) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });

export const actualMeditationSaveRequested = createEventFactory('actualMeditationSaveRequested');
export const actualMeditationSaveFailed = createEventFactory('actualMeditationSaveFailed', error => ({error}));
export const actualMeditationSaveSucceeded = createEventFactory('actualMeditationSaveSucceeded');
