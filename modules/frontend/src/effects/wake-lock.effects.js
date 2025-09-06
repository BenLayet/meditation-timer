import { createEffect } from "@softersoftware/state-manager/create-effect";
import { meditationSessionEvents } from "@meditation-timer/domain/src/features/meditation-session/meditation-session.events.js";

export const wakeLockEffects = ({ wakeLockService }) => {
  return [
    createEffect({
      afterEvent: meditationSessionEvents.disableSleepModeRequested,
      then: wakeLockService.requestWakeLock,
    }),
    createEffect({
      afterEvent: meditationSessionEvents.enableSleepModeRequested,
      then: wakeLockService.releaseWakeLock,
    }),
  ];
};
