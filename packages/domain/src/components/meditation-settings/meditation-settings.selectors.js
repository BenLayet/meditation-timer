import {flow} from 'lodash-es';
import {formatSeconds} from "../../lib/functions/duration.function.js";
import {map} from "../../lib/functions/object.functions.js";

//SELECTORS
const meditationDurationInMinutes = (state) => state.meditationDurationInMinutes;
const meditationDurationInSeconds = (state) => meditationDurationInMinutes(state) * 60;
const preparationDurationInSeconds = (state) => state.preparationDurationInSeconds;
const meditationDuration = flow(meditationDurationInSeconds, formatSeconds);
const preparationDuration = flow(preparationDurationInSeconds, formatSeconds);
const isGongOff = state => state.gongOff;

const ownStateSelectors = {
    isGongOff,
    meditationDuration,
    preparationDuration,
    meditationDurationInMinutes,
    preparationDurationInSeconds,
};
const ownState = compositeState => compositeState.ownState;
export const meditationSettingsSelectors = map(ownStateSelectors, selector => flow(ownState, selector));