import {flow} from 'lodash-es';
import {formatSeconds} from "../../lib/duration.function.js";

//SELECTORS
const meditationDurationInSeconds = (state) => state.meditationDurationInMinutes * 60;
const preparationDurationInSeconds = (state) => state.preparationDurationInSeconds;
const meditationDuration = flow(meditationDurationInSeconds, formatSeconds);
const preparationDuration = flow(preparationDurationInSeconds, formatSeconds);
const isGongOff = state => state.gongOff;
export const meditationSettingsSelectors = {
    meditationDuration, preparationDuration, isGongOff
};