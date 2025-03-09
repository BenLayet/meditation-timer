import {PREPARATION_INITIAL_STATE} from "./preparation.state.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEffects} from "./preparation.effects.js";
import {preparationEventHandlers} from "./preparation.reducers.js";

export const preparationComponent = {
    initialState: PREPARATION_INITIAL_STATE,
    eventHandlers: preparationEventHandlers,
    selectors: preparationSelectors,
    effects: preparationEffects,
};