import {mockServices, resetMocks} from "./mock-services.js";
import {StateManager} from "../../../src/lib/state-manager.js";
import {meditationTimerAppFeature} from "../../../src/features/meditation-timer-app/meditation-timer-app.feature.js";
import {logEvent} from "../../../src/lib/logger.js";
import {statePatcher} from "../../../src/lib/debugger.js";
import {flow} from "lodash-es";

//GLOBAL STATE
export let state = {};

//STATE MANAGER
export const stateManager = new StateManager(meditationTimerAppFeature, mockServices);
const initialState = stateManager.state;
export const dispatch = (event) => {
    stateManager.dispatch(event);
}
export const reset = () => {
    state = stateManager.state = initialState;
    resetMocks();
}
export const patchState = flow(statePatcher(stateManager), (res) => console.log(`patchState with ${JSON.stringify(res)}`));

stateManager.addStateChangedListener(newState => state = newState);
stateManager.addStateChangedListener(logEvent);