import {map} from "../../lib/functions/object.functions.js";
import {flow} from "lodash-es";
import {meditationSettingsSelectors,} from "../meditation-settings/meditation-settings.selectors.js";
import {not} from "../../lib/functions/predicate.functions.js";

const currentPage = state => state.currentPage;
const canSettingsBeOpened = state => ['STATISTICS', 'HOME'].includes(currentPage(state));

const ownStateSelectors = {
    canSettingsBeOpened,
    currentPage,
};
//TODO remove this when the app is refactored
const meditationSettingsState = compositeState => compositeState.children.meditationSettings;
const isGongOn = flow(meditationSettingsState, meditationSettingsSelectors.isGongOff, not);
const meditationDurationInMinutes = flow(meditationSettingsState, meditationSettingsSelectors.meditationDurationInMinutes);
const preparationDurationInSeconds = flow(meditationSettingsState, meditationSettingsSelectors.preparationDurationInSeconds);

const ownState = compositeState => compositeState.ownState;

export const meditationTimerAppSelectors = {
    ...map(ownStateSelectors, selector => flow(ownState, selector)),
    isGongOn,
    meditationDurationInMinutes,
    preparationDurationInSeconds,
};