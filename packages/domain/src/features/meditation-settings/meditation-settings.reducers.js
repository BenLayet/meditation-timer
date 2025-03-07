import {floor, max} from "lodash-es";
import {
    gongToggled,
    lessMeditationTimeRequested,
    lessPreparationTimeRequested,
    moreMeditationTimeRequested,
    morePreparationTimeRequested
} from "./meditation-settings.events.js";

//UTILITY
function calculateIncrementedDuration(duration, increment) {
    return floor((duration + increment) / increment) * increment;
}

function calculateDecrementedDuration(duration, increment) {
    const diff = duration - increment;
    if (diff < increment) {
        return max([duration - 1, 1]);
    }
    return diff;
}

//REDUCER FUNCTIONS
const onGongToggled = (state) => ({...state, gongOff: !state.gongOff});
const onMoreMeditationTimeRequested = (state) => ({
    ...state,
    meditationDurationInMinutes: calculateIncrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
});
const onLessMeditationTimeRequested = (state) => ({
    ...state,
    meditationDurationInMinutes: calculateDecrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
});
const onMorePreparationTimeRequested = (state) => ({
    ...state,
    preparationDurationInSeconds: calculateIncrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
});
const onLessPreparationTimeRequested = (state) => ({
    ...state,
    preparationDurationInSeconds: calculateDecrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
});
export const meditationSettingsEventHandlers = {
    [gongToggled.eventType]: onGongToggled,
    [moreMeditationTimeRequested.eventType]: onMoreMeditationTimeRequested,
    [lessMeditationTimeRequested.eventType]: onLessMeditationTimeRequested,
    [morePreparationTimeRequested.eventType]: onMorePreparationTimeRequested,
    [lessPreparationTimeRequested.eventType]: onLessPreparationTimeRequested,

};
