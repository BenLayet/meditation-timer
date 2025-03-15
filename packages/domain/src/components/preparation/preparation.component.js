import {PREPARATION_INITIAL_STATE} from "./preparation.state.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {preparationEvents} from "./preparation.events.js";
import {preparationChainedEvents} from "./preparation.chained-events.js";

export const preparationComponent = {
    initialState: PREPARATION_INITIAL_STATE,
    events: preparationEvents,
    selectors: preparationSelectors,
    chainedEvents: preparationChainedEvents
};