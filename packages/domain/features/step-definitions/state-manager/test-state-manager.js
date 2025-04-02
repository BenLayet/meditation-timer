import { StateManager } from "../../../src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../../src/components/meditation-timer-app/meditation-timer-app.component.js";
import { logEvent } from "../../../src/lib/logger/logger.js";
import { statePatcher } from "../../../src/lib/state-manager/debugger.js";
import { statisticsEvents } from "../../../src/components/statistics/statistics.events.js";
import { isEqual } from "lodash-es";
import { actualMeditationEvents } from "../../../src/components/actual-meditation/actual-meditation.events.js";
import {
  createEffect,
  Effects,
} from "../../../src/lib/state-manager/create-effect.js";
import { CURRENT_EPOCH_DAY } from "./test-constants.js";

//STATE MANAGER
export const stateManager = new StateManager(meditationTimerAppComponent);

//RESET
const initialState = stateManager.state;
export const reset = () => {
  stateManager.state = initialState;
  events.length = 0;
};

//EFFECTS
const effects = new Effects();

//statistics
export const meditationStorage = {meditations:[]};
effects.add({
  afterEvent: statisticsEvents.meditationHistoryRequested,
  onComponent: ["statistics"],
  then: () =>
    stateManager.getRootVM().children
  .statistics.events.meditationHistoryRetrieved(
    {...meditationStorage,
       currentEpochDay:CURRENT_EPOCH_DAY}),
});

//save meditation
effects.add({
  afterEvent: actualMeditationEvents.saveRequested,
  then: stateManager.getRootVM().children.meditationSession.children
    .actualMeditation.events.saveSucceeded,
});

//register effects as event listeners
effects.get().forEach(stateManager.addEffect);

//patch state
export const patchState = (path, patcher) => {
  const res = statePatcher(stateManager)(path, patcher);
  //console.log(`patchState with ${JSON.stringify(res)}`);
};
//FORCE STATE DEBUG EFFECT
stateManager.addEffect(
  createEffect({
    afterEvent: { eventType: "FORCE_STATE" },
    then: ({ payload }) => (stateManager.state = payload.newState),
  })
);

//EVENTS
const events = [];
export const eventWasSent = ({ eventType, componentPath, payload }) =>
  events.some(
    (evt) =>
      evt.eventType === eventType &&
      (!componentPath || isEqual(evt.componentPath, componentPath)) &&
      (!payload || isEqual(evt.payload, payload))
  );
stateManager.addEventListener((event) => events.push(event));
stateManager.addEventListener(logEvent);
