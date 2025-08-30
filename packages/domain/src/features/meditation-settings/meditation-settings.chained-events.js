import { meditationSettingsEvents } from "./meditation-settings.events.js";
import { meditationSettingsSelectors } from "./meditation-settings.selectors.js";

export const meditationSettingsChainedEvents = [
  {
    onEvent: meditationSettingsEvents.gongToggled,
    onCondition: ({ state }) => meditationSettingsSelectors.isGongOff(state),
    thenDispatch: meditationSettingsEvents.gongOffToggled,
  },
  {
    onEvent: meditationSettingsEvents.gongToggled,
    onCondition: ({ state }) => meditationSettingsSelectors.isGongOn(state),
    thenDispatch: meditationSettingsEvents.gongOnToggled,
  },
  {
    onEvent: meditationSettingsEvents.moreMeditationTimeRequested,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.lessMeditationTimeRequested,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.morePreparationTimeRequested,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.lessPreparationTimeRequested,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.gongOffToggled,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.gongOnToggled,
    thenDispatch: meditationSettingsEvents.settingsChanged,
    withPayload: ({ state }) => state.ownState,
  },
  {
    onEvent: meditationSettingsEvents.settingsLoaded,
    thenDispatch: meditationSettingsEvents.settingsChanged,
  },
];
