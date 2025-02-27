import {actualMeditationSelectors} from '../../../src/components/actual-meditation/actual-meditation.selectors';
import {describe, expect, test} from 'vitest';


describe('actualMeditationSelectors', () => {
    const timerState = {
        durationInMinutes: 5,
        remainingSeconds: 120,
        startedTimeInSeconds: 1620000000,
    };

    test('displayedTime should return formatted time', () => {
        const result = actualMeditationSelectors.displayedTime(timerState);
        expect(result).toBe('02:00');
    });
    test('displayedTime should return formatted time for 19:59', () => {
        const state = {...timerState, remainingSeconds: 1199};
        const result = actualMeditationSelectors.displayedTime(state);
        expect(result).toBe('19:59');
    });

    test('isRunning should return true if timer has started and time is not up', () => {
        const result = actualMeditationSelectors.isRunning(timerState);
        expect(result).toBe(true);
    });

    test('isRunning should return false if timer has not started', () => {
        const state = {...timerState, startedTimeInSeconds: undefined};
        const result = actualMeditationSelectors.isRunning(state);
        expect(result).toBe(false);
    });

    test('isRunning should return false if time is up', () => {
        const state = {...timerState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isRunning(state);
        expect(result).toBe(false);
    });

    test('getDurationInMinutes should return duration in minutes', () => {
        const result = actualMeditationSelectors.getDurationInMinutes(timerState);
        expect(result).toBe(5);
    });

    test('isTimeUp should return true if remaining seconds is 0', () => {
        const state = {...timerState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isTimeUp(state);
        expect(result).toBe(true);
    });

    test('isTimeUp should return false if remaining seconds is not 0', () => {
        const result = actualMeditationSelectors.isTimeUp(timerState);
        expect(result).toBe(false);
    });
});