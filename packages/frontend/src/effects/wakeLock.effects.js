import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationSessionEvents } from "domain/src/components/meditation-session/meditation-session.events.js";


export const createWakeLockEffects = ( { wakeLockService }) => {
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
