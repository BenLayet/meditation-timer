import {actualMeditationSelectors} from './actual-meditation.selectors';
import {beforeEach, describe, expect, test} from 'vitest';


describe('actualMeditationSelectors', () => {
    const initialOwnState = {
        durationInMinutes: 5,
        remainingSeconds: 120,
        startedTimeInSeconds: 1620000000,
    };
    let ownState;

    beforeEach(() => {
        ownState = initialOwnState;
    });
    test('displayedTime should return formatted time', () => {
        const result = actualMeditationSelectors.remainingTime({ownState});
        expect(result).toBe('02:00');
    });
    test('displayedTime should return formatted time for 19:59', () => {
        ownState = {...ownState, remainingSeconds: 1199};
        const result = actualMeditationSelectors.remainingTime({ownState});
        expect(result).toBe('19:59');
    });

    test('isRunning should return true if timer has started and time is not up', () => {
        const result = actualMeditationSelectors.isRunning({ownState});
        expect(result).toBe(true);
    });

    test('isRunning should return false if timer has not started', () => {
        ownState = {...ownState,  startedTimeInSeconds: undefined};
        const result = actualMeditationSelectors.isRunning({ownState});
        expect(result).toBe(false);
    });

    test('isRunning should return false if time is up', () => {
        ownState = {...ownState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isRunning({ownState});
        expect(result).toBe(false);
    });

    test('isTimeUp should return true if remaining seconds is 0', () => {
        ownState = {...ownState, remainingSeconds: 0};
        const result = actualMeditationSelectors.isTimeUp({ownState});
        expect(result).toBe(true);
    });

    test('isTimeUp should return false if remaining seconds is not 0', () => {
        const result = actualMeditationSelectors.isTimeUp({ownState});
        expect(result).toBe(false);
    });
});