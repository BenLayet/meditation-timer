import { createTimerEffects } from "./timer.effects.js";
import { createMeditationStoreEffects } from "./meditationStore.effects.js";
import { createWakeLockEffects } from "./wakeLock.effects.js";
import { createGongEffects } from "./gong.effects.js";

export const createEffects = (
  rootVM,
  { meditationService, gongService, wakeLockService, tickingService }
) => [
  ...createGongEffects({ gongService }),
  ...createWakeLockEffects({ wakeLockService }),
  ...createTimerEffects({ tickingService }, rootVM),
  ...createMeditationStoreEffects( { meditationService }, rootVM),
];
