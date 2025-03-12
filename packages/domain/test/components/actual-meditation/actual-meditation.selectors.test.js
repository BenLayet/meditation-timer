import {actualMeditationSelectors} from '../../../src/components/actual-meditation/actual-meditation.selectors';
import {describe, expect, test} from 'vitest';


describe('actualMeditationSelectors', () => {
    const initialState = {
        durationInMinutes: 5,
        remainingSeconds: 120,
        startedTimeInSeconds: 1620000000,
    };

    test('displayedTime should return formatted time', () => {
        const result = actualMeditationSelectors.remainingTime(initialState);
        expect(result).toBe('02:00');
    });
    test('displayedTime should return formatted time for 19:59', () => {
        const state = {...initialState, remainingSeconds: 1199};
        const result = actualMeditationSelectors.remainingTime(state);
        expect(result).toBe('19:59');
    });

    test('isRunning should return true if timer has started and time is not up', () => {
        const result = actualMeditationSelectors.isRunning(initialState);
        expect(result).toBe(true);
    });

    test('isRunning should return false if timer has not started', () => {
        const state = {...initialState, startedTimeInSeconds: undefined};
        const result = actualMeditationSelectors.isRunning(state);
        expect(result).toBe(false);
    });

    test('isRunning should return false if time is up', () => {
        const state = {...initialState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isRunning(state);
        expect(result).toBe(false);
    });

    test('isTimeUp should return true if remaining seconds is 0', () => {
        const state = {...initialState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isTimeUp(state);
        expect(result).toBe(true);
    });

    test('isTimeUp should return false if remaining seconds is not 0', () => {
        const result = actualMeditationSelectors.isTimeUp(initialState);
        expect(result).toBe(false);
    });
});