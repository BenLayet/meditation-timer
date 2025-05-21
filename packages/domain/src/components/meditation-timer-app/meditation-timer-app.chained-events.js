import { meditationSessionEvents } from "../meditation-session/meditation-session.events.js";
import { actualMeditationEvents } from "../actual-meditation/actual-meditation.events.js";
import { statisticsEvents } from "../statistics/statistics.events.js";
import { meditationTimerAppEvents } from "./meditation-timer-app.events.js";
import { preparationEvents } from "../preparation/preparation.events.js";
import { meditationTimerAppSelectors } from "./meditation-timer-app.selectors.js";
import { meditationSettingsEvents } from "../meditation-settings/meditation-settings.events.js";
import { accountEvents } from "../account/account.events.js";

export const meditationTimerAppChainedEvents = [
  {
    onEvent: {
      ...meditationSettingsEvents.startSessionRequested,
      childComponentPath: ["meditationSettings"],
    },
    thenDispatch: {
      ...meditationSessionEvents.startRequested,
      childComponentPath: ["meditationSession"],
    },
  },
  {
    onEvent: {
      ...meditationSessionEvents.startRequested,
      childComponentPath: ["meditationSession"],
    },
    thenDispatch: meditationTimerAppEvents.navigationRequested,
    withPayload: () => ({ page: "MEDITATION_SESSION" }),
  },
  {
    onEvent: {
      ...meditationSessionEvents.stopRequested,
      childComponentPath: ["meditationSession"],
    },
    thenDispatch: meditationTimerAppEvents.navigationRequested,
    withPayload: () => ({ page: "HOME" }),
  },
  {
    onEvent: {
      ...meditationSessionEvents.completed,
      childComponentPath: ["meditationSession"],
    },
    thenDispatch: meditationTimerAppEvents.navigationRequested,
    withPayload: ({ state }) => ({
      page: "STATISTICS",
      parameters: { currentTimeInSeconds: state.currentTimeInSeconds },
    }),
  },
  {
    onEvent: {
      ...meditationSessionEvents.startRequested,
      childComponentPath: ["meditationSession"],
    },
    thenDispatch: {
      ...preparationEvents.startRequested,
      childComponentPath: ["meditationSession", "preparation"],
    },
    withPayload: ({ previousPayload, state }) => ({
      currentTimeInSeconds: previousPayload.currentTimeInSeconds,
      requestedDurationInSeconds:
        meditationTimerAppSelectors.preparationDurationInSeconds(state),
    }),
  },
  {
    onEvent: {
      ...preparationEvents.completed,
      childComponentPath: ["meditationSession", "preparation"],
    },
    thenDispatch: {
      ...actualMeditationEvents.startRequested,
      childComponentPath: ["meditationSession", "actualMeditation"],
    },
    withPayload: ({ previousPayload, state }) => ({
      ...previousPayload,
      durationInMinutes:
        meditationTimerAppSelectors.meditationDurationInMinutes(state),
    }),
  },
  {
    onEvent: {
      ...actualMeditationEvents.saveSucceeded,
      childComponentPath: ["meditationSession", "actualMeditation"],
    },
    thenDispatch: {
      ...statisticsEvents.statisticsRequested,
      childComponentPath: ["statistics"],
    },
    withPayload: ({ previousPayload, state }) => ({
      ...previousPayload,
      durationInMinutes:
        meditationTimerAppSelectors.meditationDurationInMinutes(state),
    }),
  },
  {
    onEvent: {
      ...actualMeditationEvents.startRequested,
      childComponentPath: ["meditationSession", "actualMeditation"],
    },
    onCondition: ({ state }) => meditationTimerAppSelectors.isGongOn(state),
    thenDispatch: meditationTimerAppEvents.gongPlayRequested,
  },
  {
    onEvent: {
      ...actualMeditationEvents.completed,
      childComponentPath: ["meditationSession", "actualMeditation"],
    },
    onCondition: ({ state }) => meditationTimerAppSelectors.isGongOn(state),
    thenDispatch: meditationTimerAppEvents.gongPlayRequested,
  },
  {
    onEvent: {
      ...actualMeditationEvents.stopRequested,
      childComponentPath: ["meditationSession", "actualMeditation"],
    },
    thenDispatch: meditationTimerAppEvents.gongStopRequested,
  },
  {
    onEvent: meditationTimerAppEvents.appOpened,
    thenDispatch: {
      ...accountEvents.loadAccountRequested,
      childComponentPath: ["account"],
    },
  },
];
