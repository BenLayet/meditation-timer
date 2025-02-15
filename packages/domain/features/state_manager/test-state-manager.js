import {appEffects} from "../../src/app/app.effects.js";
import {appReducers} from "../../src/app/app.reducers.js";
import {mockServices} from "./mock-services.js";
import {INITIAL_STATE} from "../../src/app/app.state.js";
import {StateManager} from "../../src/state-manager.js";

//GLOBAL STATE
export let state = {};

//STATE MANAGER
export const testStateManager = new StateManager(INITIAL_STATE);
export const dispatch = (event)=> {
    console.debug(`Event dispatched: ${JSON.stringify(event)}`);
    console.debug(`State before: ${JSON.stringify(state)}`);
    testStateManager.dispatch(event);
}


//EFFECTS
const effects = appEffects(testStateManager.dispatch, mockServices.wakeLockService, mockServices.gongService, mockServices.tickingService);

testStateManager.registerLocalReducers(appReducers);
testStateManager.registerLocalEffects(effects);
testStateManager.setStateChangedListener((newState) => {
    state = newState;
    console.debug(`State after: ${JSON.stringify(state)}`);
});