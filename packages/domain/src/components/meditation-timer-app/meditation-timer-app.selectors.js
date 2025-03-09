import {flow} from "lodash-es";

const meditationSettingsState = state => state.meditationSettings;
const meditationSessionState = state => state.meditationSession;
const statisticsState = state => state.statistics;
const currentPage = state => state.currentPage;

const canSettingsBeOpened = flow(currentPage, ['STATISTICS', 'HOME'].includes)
export const appSelectors = {
    meditationSettingsState,
    meditationSessionState,
    statisticsState,
    canSettingsBeOpened,
    currentPage,
};