import {
  forceState,
  statePatcher,
} from "domain/src/lib/state-manager/debugger.js";
import { createEffect } from "domain/src/lib/state-manager/create-effect.js";

const trackSize = 1000;
const states = [];
const events = [];
const trackStateAndEvent = (event, state) => {
  states.unshift(state);
  const stateAfterEvent = flattenState(state);
  const componentPath = ["root", ...(event.componentPath ?? [])].join(".");
  const ownState = stateAfterEvent[componentPath];
  const date = new Date();
  const sinceLastEventMs = events.length > 0 ? date - events[0].date : 0;
  const e = {
    ...event,
    date,
    sinceLastEventMs,
    ownState,
    componentPath,
    stateAfterEvent,
  };
  if (window.sm.logEvents) {
    console.log(e);
  }
  events.unshift(e);
  states.splice(trackSize);
  events.splice(trackSize);
};

let offset = 0;
const timeTravel = () => {
  if (offset < 0) {
    console.warn("offset is 0");
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

  window.sm.replaceState(states[offset]);
};
//FORCE STATE DEBUG EFFECT
const forceStateEffect = (stateManager) =>
  createEffect({
    afterEvent: { eventType: "FORCE_STATE" },
    then: (payload) => (stateManager.state = payload.newState),
  });

export const addDebugger = (stateManager) => {
  window.sm = {
    logEvents: false,
    states,
    events,
    stateManager,
    getRootVM: () => stateManager.getRootVM(),
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
    patchState: (key, value) => {
      const newValue = statePatcher(stateManager)(key, value);
      console.log(newValue);
    },
    replaceState(newState) {
      forceState(stateManager, newState);
    },
  };

  stateManager.addEventListener(trackStateAndEvent);
  stateManager.addEventListener(forceStateEffect(stateManager));
  trackStateAndEvent({ eventType: "INITIAL_STATE" }, stateManager.state);
};

export const removeDebugger = (stateManager) => () => {
  events.length = 0;
  states.length = 0;
  stateManager.removeEventListener(trackStateAndEvent);
  stateManager.removeEventListener(forceStateEffect);
  delete window.sm;
};
function flattenState(obj, parentKey = "root") {
  const result = {};

  // If the object has ownState, keep it as is under the current path
  if (obj.ownState) {
    result[parentKey] = obj.ownState;
  }

  // Recursively process children
  if (obj.children) {
    Object.entries(obj.children).forEach(([key, value]) => {
      const childKey = `${parentKey}.${key}`;
      const flattened = flattenState(value, childKey);
      Object.assign(result, flattened);
    });
  }

  return result;
}
