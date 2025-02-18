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

export const actualMeditationDurationSet =
    createEventFactory('actualMeditationDurationSet', (durationInMinutes) => {
        ow(durationInMinutes, ow.number.integer.positive);
        return {durationInMinutes};
    });

