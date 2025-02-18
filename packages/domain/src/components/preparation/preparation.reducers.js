import {preparationCompleted, preparationStartRequested, preparationStopRequested} from "./preparation.events.js";

const onPreparationStartRequested = (payload, state) => ({
    ...state,
    isRunning: true,
});
const onPreparationCompleted = (payload, state) => ({
    ...state,
    isRunning: false,
});
const onPreparationStopRequested = (payload, state) => ({
    ...state,
    isRunning: false,
});

export const preparationReducers = (event, state) => {
    switch (event.eventType) {
        case preparationStartRequested.eventType:
            return onPreparationStartRequested(event.payload, state);
        case preparationCompleted.eventType:
            return onPreparationCompleted(event.payload, state);
        case preparationStopRequested.eventType:
            return onPreparationStopRequested(event.payload, state);
        default:
            return state;
    }
}