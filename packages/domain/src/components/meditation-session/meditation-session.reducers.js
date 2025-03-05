import {meditationSessionFinished, meditationSessionStartRequested} from "./meditation-session.events.js";

export const MEDITATION_SESSION_INITIAL_STATE = {
    isRunning: false
};
//REDUCERS
const onMeditationSessionStartRequested = () => ({
    isRunning: true
});
const onMeditationSessionFinished = () => MEDITATION_SESSION_INITIAL_STATE;

export const meditationSessionEventHandlers = {
    [meditationSessionFinished.eventType]: onMeditationSessionFinished,
    [meditationSessionStartRequested.eventType]: onMeditationSessionStartRequested,
};
