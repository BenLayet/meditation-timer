import {preparationEventHandlers} from "./preparation.reducers.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEffects} from "./preparation.effects.js";

export const preparationFeature = {
    eventHandlers: preparationEventHandlers,
    selectors: preparationSelectors,
    effects: preparationEffects,
};