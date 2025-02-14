import { validateTimerState} from "../timer/timer.state.js";
import {appSelectors} from "./app.selectors.js";

export const INITIAL_STATE = {
    meditationTimer: {
        durationInSeconds: 5 * 60,
    },
    preparationTimer: {
        durationInSeconds: 20,
    },
    settings: {
        gongVolume: 100,
        language: "en",
    },
};
export const validateAppState = (state) => {
    try {
        validateTimerState(appSelectors.getMeditationTimerState(state));
    } catch (e) {
        e.message = `Invalid meditationTimer: ${e.message}`;
        throw e;
    }
    try {
        validateTimerState(appSelectors.getPreparationTimerState(state));
    } catch (e) {
        e.message = `Invalid preparationTimer: ${e.message}`;
        throw e;
    }
}
//validate initial state on startup
validateAppState(INITIAL_STATE);