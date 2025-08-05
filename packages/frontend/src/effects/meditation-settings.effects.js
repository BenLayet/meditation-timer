import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationSettingsEvents } from "domain/src/components/meditation-settings/meditation-settings.events.js";
import { meditationTimerAppEvents } from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";

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
