import {meditationSessionFinished, meditationSessionStartRequested} from "./meditation-session.events.js";

export const MEDITATION_SESSION_INITIAL_STATE = {
    isRunning: false
};
//REDUCERS
const onMeditationSessionStartRequested = () => ({
    isRunning: true
});
const onMeditationSessionFinished = () => MEDITATION_SESSION_INITIAL_STATE;

//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [meditationSessionFinished.eventType]: onMeditationSessionFinished,
    [meditationSessionStartRequested.eventType]: onMeditationSessionStartRequested,
};
const keepState = (event, state) => state;
export const meditationSessionReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);
