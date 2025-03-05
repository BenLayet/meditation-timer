import {PREPARATION_INITIAL_STATE, preparationEventHandlers} from "./preparation.state.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEffects} from "./preparation.effects.js";

export const preparationFeature = {
    initialState: PREPARATION_INITIAL_STATE,
    eventHandlers: preparationEventHandlers,
    selectors: preparationSelectors,
    effects: preparationEffects,
};