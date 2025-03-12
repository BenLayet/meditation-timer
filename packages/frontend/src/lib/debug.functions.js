import {statePatcher} from "domain/src/lib/state-manager/debugger.js";

const trackSize = 1000;
const states = [];
const events = [];
const trackStateAndEvent = (state, event) => {
    states.unshift(state);
    events.unshift(event);
    states.splice(trackSize);
    events.splice(trackSize);
}
let offset = 0;
const timeTravel = () => {
    if (offset < 0) {
        console.warn('offset is 0');
        offset = 0;
    }
    if (offset >= trackSize) {
        console.warn(`offset trackSize is reached ${trackSize}`);
        offset = trackSize - 1;
    }
    if (offset >= states.length) {
        console.warn(`first state reached ${states.length}`);
        offset = states.length - 1;
    }
    console.log(`TIME TRAVEL offset=${offset}`);
    console.log(events[offset]);
    window.sm.state(states[offset]);
}

export const addDebugger = (stateManager) => {
    stateManager.addStateChangedListener(trackStateAndEvent)
    trackStateAndEvent(stateManager.state, {eventType: "INITIAL_STATE"});
    window.sm = {
        lastEvents: (start = 0, end) => {
            if (typeof end === "undefined") {
                end = start || 1;
                start = 0;
            }
            return events.slice(start, end);
        },
        lastStates: (start = 0, end) => {
            if (typeof end === "undefined") {
                end = start || 1;
                start = 0;
            }
            return states.slice(start, end);
        },
        history: (target) => {
            if (typeof target === "number") {
                offset = target;
                timeTravel();
            } else {
                console.log(states.length);
            }
        },
        present: () => {
            offset = 0;
            timeTravel();
        },
        fw: () => {
            offset--;
            timeTravel();
        },
        rw: () => {
            offset++;
            timeTravel();
        },
        state: (key, subPatch) => {
            statePatcher(stateManager)(key, subPatch);
            console.log(stateManager.state);
        }
    };
};
export const removeDebugger = stateManager=> () => {
    events.length = 0;
    states.length = 0;
    stateManager.removeStateChangedListener(trackStateAndEvent);
    delete window.sm;
};