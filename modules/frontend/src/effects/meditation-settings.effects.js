import { createEffect } from "@softersoftware/state-manager/create-effect";
import { meditationSettingsEvents } from "@meditation-timer/domain/src/features/meditation-settings/meditation-settings.events.js";
import { meditationTimerAppEvents } from "@meditation-timer/domain/src/features/meditation-timer-app/meditation-timer-app.events.js";

export const meditationSettingsEffects = (
  { keyValueStorageService },
  rootVM,
) => {
  // meditationSettings dispatchers
  const dispatchers = rootVM.children.meditationSettings.dispatchers;

  const saveSettings = async (meditationSettings) => {
    await keyValueStorageService.set("meditationSettings", meditationSettings);
  };
  const loadSettings = async () => {
    const meditationSettings =
      await keyValueStorageService.get("meditationSettings");
    if (meditationSettings) {
      dispatchers.settingsLoaded(meditationSettings);
    }
  };

  return [
    createEffect({
      afterEvent: meditationSettingsEvents.settingsChanged,
      then: saveSettings,
    }),
    createEffect({
      afterEvent: meditationTimerAppEvents.appOpened,
      then: loadSettings,
    }),
  ];
};
