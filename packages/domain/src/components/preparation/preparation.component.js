import {preparationReducers} from "./preparation.reducers.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEffects} from "./preparation.effects.js";

export const preparationComponent = {
    reducers: preparationReducers,
    selectors: preparationSelectors,
    effects: preparationEffects,
};