export const assertValidTimerState = (state) => {
    if (typeof state !== 'object') {
        throw new Error(`state must be an object but was ${typeof state}`);
    }
    if (typeof state.remainingSeconds !== 'number' || state.remainingSeconds < 0) {
        throw new Error(`remainingSeconds must be a non-negative number,
         but was ${typeof state.remainingSeconds}`);
    }
    if (typeof state.durationInSeconds !== 'number' || state.durationInSeconds < 0) {
        throw new Error('durationInSeconds must be a non-negative number');
    }
    if (state.remainingSeconds > state.durationInSeconds) {
        throw new Error('remainingSeconds must be less than or equal to durationInSeconds');
    }
}
