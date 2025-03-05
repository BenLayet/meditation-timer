import {mockServices, resetMocks} from "./mock-services.js";
import {StateManager} from "../../../src/lib/state-manager.js";
import {meditationTimerApp} from "../../../src/app/meditation-timer.app.js";
import {logEvent} from "../../../src/lib/logger.js";
import {statePatcher} from "../../../src/lib/debugger.js";
import {flow} from "lodash-es";

//GLOBAL STATE
export let state = {};

//STATE MANAGER
export const stateManager = new StateManager(meditationTimerApp, mockServices);
export const dispatch = (event) => {
    stateManager.dispatch(event);
}
export const reset = () => {
    stateManager.state = meditationTimerApp.initialState;
    state = stateManager.state;
    resetMocks();
}
export const patchState = flow(statePatcher(stateManager), (res) => console.log(`patchState with ${JSON.stringify(res)}`));

stateManager.addStateChangedListener(newState => state = newState);
stateManager.addStateChangedListener(logEvent);