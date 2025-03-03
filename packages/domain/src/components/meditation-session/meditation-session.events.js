import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

export const meditationSessionStartRequested =
    createEventFactory('meditationSessionStartRequested', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });

export const meditationSessionCompleted = createEventFactory('meditationSessionCompleted');
export const meditationSessionStopRequested = createEventFactory('meditationSessionStopRequested');
export const meditationSessionFinished = createEventFactory('meditationSessionFinished');