import { createEffect } from "@softer-software/state-manager/create-effect.js";
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
