import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

export const meditationSessionStartRequested =
    createEventFactory('meditationSessionStartRequested', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });

export const meditationSessionCompleted =
    createEventFactory('meditationSessionCompleted', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });
export const meditationSessionResetRequested = createEventFactory('meditationSessionResetRequested');