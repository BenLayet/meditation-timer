import {flow} from "lodash-es";
import {navigationSelectors} from "../navigation/navigation.selectors.js";

const meditationSettingsState = state => state.meditationSettings;
const meditationSessionState = state => state.meditationSession;
const statisticsState = state => state.statistics;
const navigationState = state => state.navigation;
const currentPage = flow(navigationState, navigationSelectors.currentPage)
const canSettingsBeOpened = flow(navigationState, navigationSelectors.currentPage, ['STATISTICS', 'HOME'].includes)
export const appSelectors = {
    navigationState,
    meditationSettingsState,
    meditationSessionState,
    statisticsState,
    canSettingsBeOpened,
    currentPage,
};