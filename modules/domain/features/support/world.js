import { StateManager } from "@softersoftware/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../src/features/meditation-timer-app/meditation-timer-app.component.js";
import { statePatcher } from "@softersoftware/state-manager/debugger.js";
import { isEqual } from "lodash-es";
import {
  AfterStep,
  Before,
  After,
  setWorldConstructor,
} from "@cucumber/cucumber";
import { compareObjects } from "./compare-objects.js";
import { createTestEffects } from "./test-effects.js";

let stateManager;
let mockLocalDatabase = {};
let mockRemoteDatabase = {};
let events = [];
let clock = {
  currentEpochSeconds: 1,
};

class CustomWorld {
  constructor() {}

  get state() {
    return stateManager.state;
  }

  get localStorage() {
    return mockLocalDatabase;
  }
  get remoteStorage() {
    return mockRemoteDatabase;
  }

  vm() {
    return stateManager.getRootVM();
  }

  //patch state
  patchState = (path, patcher) => {
    statePatcher(stateManager)(path, patcher); //
    //console.log(`patchState with ${JSON.stringify(res)}`);
  };

  eventWasSent = ({ eventType, componentPath, payload }) =>
    events.some(
      (evt) =>
        evt.eventType === eventType &&
        (!componentPath || isEqual(evt.componentPath, componentPath)) &&
        (!payload || isEqual(evt.payload, payload)),
    );
}

setWorldConstructor(CustomWorld);

const initializeScenario = () => {
  stateManager = new StateManager(meditationTimerAppComponent);
  mockLocalDatabase = {
    meditationHistory: [],
  };
  mockRemoteDatabase = {
    meditationHistory: [],
  };
  createTestEffects(
    stateManager,
    mockLocalDatabase,
    mockRemoteDatabase,
    clock,
  ).forEach(stateManager.addEffect);
  events = [];
  stateManager.addEventListener((e) => events.push(e));
  stateManager.getRootVM().dispatchers.appOpened();
};

Before(initializeScenario);
After(function ({ result }) {
  if (result.status === "FAILED") {
    console.log();
    console.log("------LAST STATE COMPARED WITH INITIAL STATE------");
    console.log(
      JSON.stringify(
        compareObjects(
          new StateManager(meditationTimerAppComponent).state,
          stateManager.state,
        ),
        null,
        2,
      ),
    );
    console.log("------SENT EVENTS------");
    console.log(
      events.map((e) => ({
        ...e,
        payload: e.payload ? JSON.stringify(e.payload) : null,
      })),
    );
  }
});
