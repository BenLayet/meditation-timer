import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

export const preparationStartRequested =
    createEventFactory('preparationStartRequested', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });
export const preparationTimerTicked=
    createEventFactory('preparationTimerTicked', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });
export const preparationCompleted =
    createEventFactory('preparationCompleted', (currentTimeInSeconds) => {
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {currentTimeInSeconds};
    });

export const preparationStopRequested = createEventFactory('preparationStopRequested');