import { StateManager } from "../../src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../src/features/meditation-timer-app/meditation-timer-app.component.js";
import { statePatcher } from "../../src/lib/state-manager/debugger.js";
import { isEqual } from "lodash-es";
import { AfterStep, Before, setWorldConstructor } from "@cucumber/cucumber";
import { compareObjects } from "../../src/lib/logger/compare-objects.js";
import { createTestEffects } from "./test-effects.js";

let stateManager;
let mockLocalDatabase = {};
let mockRemoteDatabase = {};
let events = [];

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
  ).forEach(stateManager.addEffect);
  events = [];
  stateManager.addEventListener((e) => events.push(e));
  stateManager.getRootVM().dispatchers.appOpened();
};

Before(initializeScenario);
AfterStep(function ({ result }) {
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
