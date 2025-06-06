import ow from "ow";

const VALID_PAGES = ["HOME", "MEDITATION_SESSION", "STATISTICS"];

export const meditationTimerAppEvents = {
  appOpened: {
    eventType: "appOpened",
    isNewCycle: true,
  },
  navigationRequested: {
    eventType: "navigationRequested",
    payloadShape: { page: ow.string.oneOf(VALID_PAGES) },
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
  onlineDetected: {
    eventType: "onlineDetected",
    isNewCycle: true,
  },
};
