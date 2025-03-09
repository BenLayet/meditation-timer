import {statisticsEffects} from "./statistics.effects.js";
import {STATISTICS_INITIAL_STATE} from "./statistics.state.js";
import {statisticsSelectors} from "./statistics.selectors.js";
import {statisticsEventHandlers} from "./statistics.reducers.js";

export const statisticsComponent = {
    initialState: STATISTICS_INITIAL_STATE,
    effects: statisticsEffects,
    eventHandlers: statisticsEventHandlers,
    selectors: statisticsSelectors
};