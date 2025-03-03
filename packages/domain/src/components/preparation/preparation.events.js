import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

//TODO declare events with name / args / validation / payload factory

export const preparationStartRequested =
    createEventFactory('preparationStartRequested', (requestedDurationInSeconds, currentTimeInSeconds) => {
        ow(requestedDurationInSeconds, ow.number.integer.positive);
        ow(currentTimeInSeconds, ow.number.integer.positive);
        return {requestedDurationInSeconds, currentTimeInSeconds};
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
export const moreTimeDuringPreparationRequested = createEventFactory('moreTimeDuringPreparationRequested');
export const skipPreparationRequested = createEventFactory('skipPreparationRequested');

export const preparationFinished = createEventFactory('preparationFinished');

