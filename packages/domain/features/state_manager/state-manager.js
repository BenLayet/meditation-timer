import {appEffects} from "../../src/app/app.effects.js";
import {appReducers} from "../../src/app/app.reducers.js";
import {mockServices} from "./mock-services.js";
import {validateAppState} from "../../src/app/app.state.js";

//GLOBAL STATE
export let state = {};
export const forceState = (newState) => {
    validateAppState(newState);
    state = newState;
};

//EFFECTS
const effects = appEffects(
    dispatch,
    mockServices.wakeLockService,
    mockServices.gongService,
    );
//DISPATCH
export function dispatch(event) {
    //reducers
    state = appReducers(event, state);
    //side effects
    effects
        .filter(effect => effect.triggerEventType === event.type)
        .forEach(effect => effect.eventOccurred(event.payload));
}
