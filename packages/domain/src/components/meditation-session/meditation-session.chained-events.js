import { meditationSessionEvents } from "./meditation-session.events.js";
import { preparationEvents } from "../preparation/preparation.events.js";
import { actualMeditationEvents } from "../actual-meditation/actual-meditation.events.js";

export const meditationSessionChainedEvents = [
  {
    onEvent: meditationSessionEvents.completed,
    thenDispatch: meditationSessionEvents.finished,
  },
  {
    onEvent: meditationSessionEvents.stopRequested,
    thenDispatch: meditationSessionEvents.finished,
  },
  {
    onEvent: meditationSessionEvents.stopRequested,
    thenDispatch: {
      ...preparationEvents.stopRequested,
      childComponentPath: ["preparation"],
    },
  },
  {
    onEvent: meditationSessionEvents.stopRequested,
    thenDispatch: {
      ...actualMeditationEvents.stopRequested,
      childComponentPath: ["actualMeditation"],
    },
  },
  {
    onEvent: {
      ...actualMeditationEvents.completed,
      childComponentPath: ["actualMeditation"],
    },
    thenDispatch: meditationSessionEvents.completed,
  },
  {
    onEvent: meditationSessionEvents.startRequested,
    thenDispatch: meditationSessionEvents.disableSleepModeRequested,
  },
  {
    onEvent: meditationSessionEvents.finished,
    thenDispatch: meditationSessionEvents.enableSleepModeRequested,
  },
];
