import {mockServices, resetMocks} from "./mock-services.js";
import {StateManager} from "../../src/lib/state-manager.js";
import {meditationTimerApp} from "../../src/meditation-timer.app.js";
import {logEvent} from "../../src/lib/logger.js";

//GLOBAL STATE
export let state = {};

//STATE MANAGER
const stateManager = new StateManager(meditationTimerApp, mockServices);
export const dispatch = (event) => {
    stateManager.dispatch(event);
}
export const reset = () => {
    stateManager.state = meditationTimerApp.initialState;
    state = stateManager.state;
    resetMocks();
}

stateManager.addStateChangedListener(newState => state = newState);
stateManager.addStateChangedListener(logEvent);