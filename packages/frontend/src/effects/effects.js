import { createTimerEffects } from "./timer.effects.js";
import { createSaveMeditationEffects } from "./save-meditation.effects.js";
import { createLoadMeditationsEffects } from "./load-meditations.effect.js";
import { createWakeLockEffects } from "./wake-lock.effects.js";
import { createGongEffects } from "./gong.effects.js";
import { createEmailActivationEffects } from "./email-activation.effect.js";

export const createEffects = (
  rootVM,
  {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
    emailActivationService,
    keyValueStorageService,
  }
) => [
  ...createGongEffects({ gongService }),
  ...createWakeLockEffects({ wakeLockService }),
  ...createTimerEffects({ tickingService }, rootVM),
  ...createSaveMeditationEffects({ meditationService }, rootVM),
  ...createLoadMeditationsEffects({ meditationService }, rootVM),
  ...createEmailActivationEffects({ emailActivationService, keyValueStorageService }, rootVM),
];
