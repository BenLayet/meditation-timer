import { StateManager } from "../../src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../src/components/meditation-timer-app/meditation-timer-app.component.js";
import { statePatcher } from "../../src/lib/state-manager/debugger.js";
import { statisticsEvents } from "../../src/components/statistics/statistics.events.js";
import { isEqual } from "lodash-es";
import { actualMeditationEvents } from "../../src/components/actual-meditation/actual-meditation.events.js";
import { createEffect } from "../../src/lib/state-manager/create-effect.js";
import { CURRENT_EPOCH_DAY } from "./test-constants.js";
import { accountEvents } from "../../src/components/account/account.events.js";
import { AfterStep, Before, setWorldConstructor } from "@cucumber/cucumber";
import { compareObjects } from "../../src/lib/logger/compare-objects.js";
import { accountStatus } from "../../src/models/account.model.js";
import { createAccountFormEvents } from "../../src/components/create-account-form/create-account-form.events.js";
import { loginFormEvents } from "../../src/components/login-form/login-form.events.js";
import { meditationTimerAppEvents } from "../../src/components/meditation-timer-app/meditation-timer-app.events.js";

let stateManager;
let mockLocalDatabase = {};
let mockRemoteDatabase = {};
let events = [];

const addMockedEffects = (
  stateManager,
  mockLocalDatabase,
  mockRemoteDatabase,
  events,
) => {
  //EFFECTS
  //isOnline
  stateManager.addEffect(
    createEffect({
      afterEvent: { ...meditationTimerAppEvents.appOpened },
      then: () =>
        stateManager
          .getRootVM()
          .dispatchers.onlineStatusChanged({ isOnline: true }),
    }),
  );
  //statistics
  stateManager.addEffect(
    createEffect({
      afterEvent: statisticsEvents.meditationHistoryRequested,
      onComponent: ["statistics"],
      then: () =>
        stateManager
          .getRootVM()
          .children.statistics.dispatchers.meditationHistoryRetrieved({
            ...mockLocalDatabase.meditationStorage,
            currentEpochDay: CURRENT_EPOCH_DAY,
          }),
    }),
  );

  //save meditation
  stateManager.addEffect(
    createEffect({
      afterEvent: actualMeditationEvents.saveRequested,
      then: stateManager.getRootVM().children.meditationSession.children
        .actualMeditation.dispatchers.saveSucceeded,
    }),
  );

  //account
  stateManager.addEffect(
    createEffect({
      afterEvent: createAccountFormEvents.createAccountRequested,
      then: (previousPayload) => {
        stateManager
          .getRootVM()
          .children.account.children.createAccountForm.dispatchers.createAccountSucceeded(
            {
              login: previousPayload.login,
              userToken: "USER_TOKEN",
            },
          );
      },
    }),
  );
  stateManager.addEffect(
    createEffect({
      afterEvent: loginFormEvents.loginRequested,
      then: (previousPayload) => {
        stateManager
          .getRootVM()
          .children.account.children.loginForm.dispatchers.loginSucceeded({
            login: previousPayload.login,
            userToken: "USER_TOKEN",
          });
      },
    }),
  );
  stateManager.addEffect(
    createEffect({
      afterEvent: accountEvents.accountNewlyAuthenticated,
      then: (previousPayload) => {
        mockLocalDatabase.account = {
          login: previousPayload.login,
          status: accountStatus.AUTHENTICATED,
        };
      },
    }),
  );
  stateManager.addEffect(
    createEffect({
      afterEvent: accountEvents.loadAccountRequested,
      then: () =>
        stateManager.getRootVM().children.account.dispatchers.accountLoaded({
          account: mockLocalDatabase.account,
        }),
    }),
  );
  stateManager.addEffect(
    createEffect({
      afterEvent: accountEvents.disconnectRequested,
      then: () =>
        stateManager
          .getRootVM()
          .children.account.dispatchers.disconnectSucceeded(),
    }),
  );

  //FORCE STATE DEBUG EFFECT
  stateManager.addEffect(
    createEffect({
      afterEvent: { eventType: "FORCE_STATE" },
      then: (payload) => (stateManager.state = payload.newState),
    }),
  );

  //EVENTS
  stateManager.addEventListener((event) => events.push(event));
};

const initializeScenario = () => {
  stateManager = new StateManager(meditationTimerAppComponent);
  mockLocalDatabase = {
    meditationStorage: { meditationHistory: [] },
  };
  mockRemoteDatabase = {};
  events = [];
  addMockedEffects(stateManager, mockLocalDatabase, mockRemoteDatabase, events);

  stateManager.getRootVM().dispatchers.appOpened();
};

class CustomWorld {
  constructor() {}

  get state() {
    return stateManager.state;
  }

  get account() {
    return mockLocalDatabase.account;
  }
  set account(account) {
    mockLocalDatabase.account = account;
  }

  get meditationStorage() {
    return mockLocalDatabase.meditationStorage;
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
