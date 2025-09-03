import { statisticsEvents } from "../../src/features/statistics/statistics.events.js";
import { actualMeditationEvents } from "../../src/features/actual-meditation/actual-meditation.events.js";
import { createEffect } from "@softersoftware/state-manager/create-effect.js";
import { CURRENT_EPOCH_DAY } from "./test-constants.js";
import { accountEvents } from "../../src/features/account/account.events.js";
import { createAccountFormEvents } from "../../src/features/create-account-form/create-account-form.events.js";
import { loginFormEvents } from "../../src/features/login-form/login-form.events.js";
import { meditationTimerAppEvents } from "../../src/features/meditation-timer-app/meditation-timer-app.events.js";
import { synchronizationEvents } from "../../src/features/synchronization/synchronization.events.js";

export const createTestEffects = (
  stateManager,
  mockLocalDatabase,
  mockRemoteDatabase,
  clock,
) => [
  //EFFECTS
  //isOnline
  createEffect({
    afterEvent: { ...meditationTimerAppEvents.onlineStatusWatchRequested },
    then: () =>
      stateManager
        .getRootVM()
        .dispatchers.onlineStatusChanged({ isOnline: true }),
  }),
  //statistics
  createEffect({
    afterEvent: statisticsEvents.retrievePersistedMeditationHistoryRequested,
    onComponent: ["statistics"],
    then: () =>
      stateManager
        .getRootVM()
        .children.statistics.dispatchers.retrievePersistedMeditationHistorySucceeded(
          {
            meditationHistory: mockLocalDatabase.meditationHistory,
          },
        ),
  }),
  createEffect({
    afterEvent: statisticsEvents.currentDayRequested,
    onComponent: ["statistics"],
    then: () =>
      stateManager
        .getRootVM()
        .children.statistics.dispatchers.currentDayObtained({
          currentEpochDay: CURRENT_EPOCH_DAY,
        }),
  }),
  //save meditation
  createEffect({
    afterEvent: actualMeditationEvents.saveRequested,
    then: stateManager.getRootVM().children.meditationSession.children
      .actualMeditation.dispatchers.saveSucceeded,
  }),
  //account
  createEffect({
    afterEvent: createAccountFormEvents.createAccountRequested,
    then: (payload) => {
      stateManager
        .getRootVM()
        .children.account.children.createAccountForm.dispatchers.createAccountSucceeded(
          {
            account: {
              login: payload.login,
              userToken: "USER_TOKEN",
            },
          },
        );
    },
  }),
  createEffect({
    afterEvent: loginFormEvents.loginRequested,
    then: (payload) => {
      stateManager
        .getRootVM()
        .children.account.children.loginForm.dispatchers.loginSucceeded({
          account: {
            login: payload.login,
            userToken: "USER_TOKEN",
          },
        });
    },
  }),
  createEffect({
    afterEvent: accountEvents.persistAccountRequested,
    then: (payload) => (mockLocalDatabase.account = payload.account),
  }),
  createEffect({
    afterEvent: accountEvents.retrievePersistedAccountRequested,
    then: () =>
      stateManager
        .getRootVM()
        .children.account.dispatchers.retrievePersistedAccountCompleted({
          account: mockLocalDatabase.account,
        }),
  }),
  createEffect({
    afterEvent: accountEvents.deletePersistedAccountRequested,
    then: () => {
      delete mockLocalDatabase.account;
      stateManager
        .getRootVM()
        .children.account.dispatchers.deletePersistedAccountCompleted();
    },
  }),
  createEffect({
    afterEvent: synchronizationEvents.synchronizationRequested,
    then: () => {
      const localMeditationHistory = [...mockLocalDatabase.meditationHistory];
      mockLocalDatabase.meditationHistory.push(
        ...mockRemoteDatabase.meditationHistory,
      );
      mockRemoteDatabase.meditationHistory.push(...localMeditationHistory);
      stateManager
        .getRootVM()
        .children.account.children.synchronization.dispatchers.synchronizationSucceeded(
          { lastSynchronizedEpochSeconds: clock.currentEpochSeconds },
        );
    },
  }),

  createEffect({
    afterEvent: accountEvents.deletePersistedAccountRequested,
    then: () => delete mockLocalDatabase.account,
  }),

  //FORCE STATE DEBUG EFFECT
  createEffect({
    afterEvent: { eventType: "FORCE_STATE" },
    then: (payload) => (stateManager.state = payload.newState),
  }),
];
