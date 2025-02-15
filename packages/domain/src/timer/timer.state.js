import ow from 'ow';
import {BEGINNING_OF_TIME_IN_MS} from "./timer.constant.js";

export const validateTimerState = (state) => {
    ow(state, ow.object.exactShape({
        startedTimestampInMs: ow.optional.number.integer.greaterThanOrEqual(BEGINNING_OF_TIME_IN_MS),
        remainingSeconds: ow.optional.number.integer.greaterThanOrEqual(0),
        durationInSeconds: ow.number.integer.greaterThanOrEqual(0)
    }));

    if (state.remainingSeconds > state.durationInSeconds) {
        throw new Error('remainingSeconds must be less than or equal to durationInSeconds');
    }
};