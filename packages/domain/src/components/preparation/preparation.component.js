import {preparationEventHandlers} from "./preparation.reducers.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEffects} from "./preparation.effects.js";

export const preparationComponent = {
    eventHandlers: preparationEventHandlers,
    selectors: preparationSelectors,
    effects: preparationEffects,
};