import { z } from "zod";
import { VALID_PAGES } from "./meditation-timer-app.state.js";

const navigationRequestedPayload = z.object({
  page: z.enum(VALID_PAGES),
});

export const meditationTimerAppEvents = {
  appOpened: {
    eventType: "appOpened",
    isNewCycle: true,
  },
  navigationRequested: {
    eventType: "navigationRequested",
    payloadShape: navigationRequestedPayload,
    handler: (state, { page }) => ({ ...state, currentPage: page }),
    isNewCycle: true,
  },
  gongPlayRequested: {
    eventType: "gongPlayRequested",
    isNewCycle: true,
  },
  gongStopRequested: {
    eventType: "gongStopRequested",
    isNewCycle: true,
  },
  onlineStatusWatchRequested: {
    eventType: "onlineStatusWatchRequested",
  },
  onlineStatusChanged: {
    eventType: "onlineStatusChanged",
    payloadShape: z.object({ isOnline: z.boolean() }),
    isNewCycle: true,
  },
  onlineDetected: {
    eventType: "onlineDetected",
  },
};
