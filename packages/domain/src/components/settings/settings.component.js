import {settingsReducers} from "./settings.reducers.js";
import {settingsSelectors} from "./settings.selectors.js";
import {settingsEffects} from "./settings.effects.js";

export const settingsComponent = {
    reducers: settingsReducers,
    selectors: settingsSelectors,
    effects: settingsEffects,
};