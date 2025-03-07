import {flow} from 'lodash-es';
import {formatSeconds} from "../../lib/duration.function.js";

//SELECTORS
const meditationDurationInSeconds = (state) => state.meditationDurationInMinutes * 60;
const preparationDurationInSeconds = (state) => state.preparationDurationInSeconds;
export const meditationDuration = flow(meditationDurationInSeconds, formatSeconds);
export const preparationDuration = flow(preparationDurationInSeconds, formatSeconds);
export const isGongOff = state => state.gongOff;