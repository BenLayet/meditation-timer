import { StateManager } from "../../../src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../../src/components/meditation-timer-app/meditation-timer-app.component.js";
import { logEvent } from "../../../src/lib/logger/logger.js";
import { statePatcher } from "../../../src/lib/state-manager/debugger.js";
import { statisticsEvents } from "../../../src/components/statistics/statistics.events.js";
import { isEqual } from "lodash-es";
import { actualMeditationEvents } from "../../../src/components/actual-meditation/actual-meditation.events.js";
import {
  createEffect
} from "../../../src/lib/state-manager/create-effect.js";
import { CURRENT_EPOCH_DAY } from "./test-constants.js";
import { accountEvents } from "../../../src/components/account/account.events.js";

//STATE MANAGER
export const stateManager = new StateManager(meditationTimerAppComponent);

//EFFECTS
//statistics
export const meditationStorage = {meditations:[]};
stateManager.addEffect(createEffect({
  afterEvent: statisticsEvents.meditationHistoryRequested,
  onComponent: ["statistics"],
  then: () =>
    stateManager.getRootVM().children
  .statistics.dispatchers.meditationHistoryRetrieved(
    {...meditationStorage,
       currentEpochDay:CURRENT_EPOCH_DAY}),
}));

//save meditation
stateManager.addEffect(createEffect({
  afterEvent: actualMeditationEvents.saveRequested,
  then: stateManager.getRootVM().children.meditationSession.children
    .actualMeditation.dispatchers.saveSucceeded,
}));

//account
export let account = {devices:[], email: null, status: "ANONYMOUS"};
stateManager.addEffect(createEffect({
  afterEvent: accountEvents.accountFetchRequested,
  then: () =>
    stateManager.getRootVM().children.account.dispatchers.accountFetchSucceeded(account),
}));

//patch state
export const patchState = (path, patcher) => {
  statePatcher(stateManager)(path, patcher); //
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

//RESET
const initialState = stateManager.state;
const initialAccount = {...account};
export const reset = () => {
  stateManager.state = initialState;
  events.length = 0;
  account = initialAccount;
};
