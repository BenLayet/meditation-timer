import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationTimerAppEvents } from "domain/src/features/meditation-timer-app/meditation-timer-app.events.js";
import { meditationSettingsEvents } from "domain/src/features/meditation-settings/meditation-settings.events.js";

export const gongEffects = ({ gongService }) => {
  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.gongPlayRequested,
      then: gongService.play,
    }),
    createEffect({
      afterEvent: meditationTimerAppEvents.gongStopRequested,
      then: gongService.stop,
    }),
    createEffect({
      afterEvent: meditationSettingsEvents.gongOffToggled,
      then: gongService.volumeOff,
    }),
    createEffect({
      afterEvent: meditationSettingsEvents.gongOnToggled,
      then: gongService.volumeOn,
    }),
    createEffect({
      afterEvent: meditationSettingsEvents.gongPlayRequested,
      then: gongService.play,
    }),
    createEffect({
      afterEvent: meditationSettingsEvents.gongStopRequested,
      then: gongService.stop,
    }),
  ];
};
