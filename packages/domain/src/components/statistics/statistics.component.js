import {statisticsEffects} from "./statistics.effects.js";
import {statisticsReducers} from "./statistics.reducers.js";
import {statisticsSelectors} from "./statistics.selectors.js";

export const statisticsComponent = {
    effects: statisticsEffects,
    reducers: statisticsReducers,
    selectors: statisticsSelectors
};