import { createTimerEffects } from "./timer.effects.js";
import { createSaveMeditationEffects } from "./save-meditation.effects.js";
import { createLoadMeditationsEffects } from "./load-meditations.effects.js";
import { createWakeLockEffects } from "./wake-lock.effects.js";
import { createGongEffects } from "./gong.effects.js";
import { createEmailVerificationEffects } from "./email-verification.effects.js";
import { createAccountEffects } from "./account.effects.js";

export const createEffects = (
  rootVM,
  {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
    emailVerificationService,
    keyValueStorageService,
  },
) => [
  ...createGongEffects({ gongService }),
  ...createWakeLockEffects({ wakeLockService }),
  ...createTimerEffects({ tickingService }, rootVM),
  ...createSaveMeditationEffects({ meditationService }, rootVM),
  ...createLoadMeditationsEffects({ meditationService }, rootVM),
  ...createAccountEffects({ keyValueStorageService }, rootVM),
  ...createEmailVerificationEffects(
    { emailVerificationService, keyValueStorageService },
    rootVM,
  ),
];
