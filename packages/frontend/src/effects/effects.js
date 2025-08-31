import { timerEffects } from "./timer.effects.js";
import { saveMeditationEffects } from "./save-meditation.effects.js";
import { loadMeditationsEffects } from "./load-meditations.effects.js";
import { wakeLockEffects } from "./wake-lock.effects.js";
import { gongEffects } from "./gong.effects.js";
import { localAccountEffects } from "./local-account.effects.js";
import { onlineDetectionEffects } from "./online-detection.effects.js";
import { synchronizationEffects } from "./synchronization.effects.js";
import { meditationSettingsEffects } from "./meditation-settings.effects.js";
import { createAccountEffects } from "./create-account.effects.js";
import { loginEffects } from "./login.effects.js";

export const createEffects = (
  rootVM,
  {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
    keyValueStorageService,
    synchronizationTaskService,
    accountApi,
    resetSynchronizationService,
  },
) => [
  ...onlineDetectionEffects({}, rootVM),
  ...synchronizationEffects({ synchronizationTaskService }, rootVM),
  ...meditationSettingsEffects({ keyValueStorageService }, rootVM),
  ...gongEffects({ gongService }),
  ...wakeLockEffects({ wakeLockService }),
  ...timerEffects({ tickingService }, rootVM),
  ...saveMeditationEffects({ meditationService }, rootVM),
  ...loadMeditationsEffects(
    { meditationService, resetSynchronizationService },
    rootVM,
  ),
  ...localAccountEffects({ keyValueStorageService }, rootVM),
  ...createAccountEffects({ accountApi }, rootVM),
  ...loginEffects({ accountApi }, rootVM),
];
