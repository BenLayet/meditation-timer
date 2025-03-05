import {statisticsEffects} from "./statistics.effects.js";
import {statisticsEventHandlers} from "./statistics.reducers.js";
import {statisticsSelectors} from "./statistics.selectors.js";

export const statisticsComponent = {
    effects: statisticsEffects,
    eventHandlers: statisticsEventHandlers,
    selectors: statisticsSelectors
};