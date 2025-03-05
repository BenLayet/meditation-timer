import {statisticsEffects} from "./statistics.effects.js";
import {STATISTICS_INITIAL_STATE, statisticsEventHandlers} from "./statistics.state.js";
import {statisticsSelectors} from "./statistics.selectors.js";

export const statisticsFeature = {
    initialState: STATISTICS_INITIAL_STATE,
    effects: statisticsEffects,
    eventHandlers: statisticsEventHandlers,
    selectors: statisticsSelectors
};