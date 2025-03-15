import {STATISTICS_INITIAL_STATE} from "./statistics.state.js";
import {statisticsSelectors} from "./statistics.selectors.js";
import {statisticsEvents} from "./statistics.events.js";

export const statisticsComponent = {
    initialState: STATISTICS_INITIAL_STATE,
    events: statisticsEvents,
    selectors: statisticsSelectors
};