import { StateManager } from "../../src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "../../src/components/meditation-timer-app/meditation-timer-app.component.js";
import { statePatcher } from "../../src/lib/state-manager/debugger.js";
import { statisticsEvents } from "../../src/components/statistics/statistics.events.js";
import { isEqual } from "lodash-es";
import { actualMeditationEvents } from "../../src/components/actual-meditation/actual-meditation.events.js";
import { createEffect } from "../../src/lib/state-manager/create-effect.js";
import { CURRENT_EPOCH_DAY } from "./test-constants.js";
import { accountEvents } from "../../src/components/account/account.events.js";
import { emailVerificationEvents } from "../../src/components/email-verification/email-verification.events.js";
import { Before, AfterStep, setWorldConstructor } from "@cucumber/cucumber";
import { compareObjects } from "../../src/lib/logger/compare-objects.js";
import { accountStatus } from "../../src/components/account/account.state.js";
import { emailVerificationStatus } from "../../src/models/email-verification.model.js";

let stateManager;
let mockState;

const addMockedEffects = (
  stateManager,
  { meditationStorage, account, remoteEmailVerification, events },
) => {
  //EFFECTS
  //statistics
  stateManager.addEffect(
    createEffect({
      afterEvent: statisticsEvents.meditationHistoryRequested,
      onComponent: ["statistics"],
      then: () =>
        stateManager
          .getRootVM()
          .children.statistics.dispatchers.meditationHistoryRetrieved({
            ...meditationStorage,
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
      afterEvent: accountEvents.createAccountRequested,
      then: () =>
        stateManager
          .getRootVM()
          .children.account.dispatchers.accountCreated({ account }),
    }),
  );
  stateManager.addEffect(
    createEffect({
      afterEvent: accountEvents.loadAccountRequested,
      then: () =>
        stateManager
          .getRootVM()
          .children.account.dispatchers.accountLoaded({ account }),
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
  //email verification
  stateManager.addEffect(
    createEffect({
      afterEvent: emailVerificationEvents.refreshRequested,
      then: () =>
        stateManager
          .getRootVM()
          .children.account.children.emailVerification.dispatchers.refreshCompleted(
            remoteEmailVerification,
          ),
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
  mockState = {
    meditationStorage: { meditations: [] },
    account: { email: null, status: accountStatus.ANONYMOUS },
    remoteEmailVerification: {
      status: emailVerificationStatus.CREATED,
    },
    events: [],
  };
  stateManager = new StateManager(meditationTimerAppComponent);
  addMockedEffects(stateManager, mockState);
};

class CustomWorld {
  constructor() {}

  get state() {
    return stateManager.state;
  }

  get account() {
    return mockState.account;
  }

  get remoteEmailVerification() {
    return mockState.remoteEmailVerification;
  }

  get meditationStorage() {
    return mockState.meditationStorage;
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
    mockState.events.some(
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
      mockState.events.map((e) => ({
        ...e,
        payload: e.payload ? JSON.stringify(e.payload) : null,
      })),
    );
  }
});
