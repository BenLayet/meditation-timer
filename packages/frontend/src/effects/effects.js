import { timerEffects } from "./timer.effects.js";
import { saveMeditationEffects } from "./save-meditation.effects.js";
import { loadMeditationsEffects } from "./load-meditations.effects.js";
import { wakeLockEffects } from "./wake-lock.effects.js";
import { gongEffects } from "./gong.effects.js";
import { localAccountEffects } from "./local-account.effects.js";
import { onlineDetectionEffects } from "./online-detection.effects.js";
import { synchronizationEffects } from "./synchronization.effects.js";
import { meditationSettingsEffects } from "./meditation-settings.effects.js";

export const createEffects = (
  rootVM,
  {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
    keyValueStorageService,
    synchronizationTaskService,
  },
) => [
  ...onlineDetectionEffects({}, rootVM),
  ...synchronizationEffects({ synchronizationTaskService }),
  ...meditationSettingsEffects({ keyValueStorageService }, rootVM),
  ...gongEffects({ gongService }),
  ...wakeLockEffects({ wakeLockService }),
  ...timerEffects({ tickingService }, rootVM),
  ...saveMeditationEffects({ meditationService }, rootVM),
  ...loadMeditationsEffects({ meditationService }, rootVM),
  ...localAccountEffects({ keyValueStorageService }, rootVM),
];
