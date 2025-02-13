import {isTimeUp} from "../timer/timer.selectors.js";

export const getDisplayedTime = (state) => getFormattedTime(state.meditationTimerState)

export const isPreparationTimeUp = (state) => isTimeUp(state.preparationTimerState);
