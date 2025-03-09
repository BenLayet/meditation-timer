import {floor, max} from "lodash-es";
import {meditationSettingsEvents} from "./meditation-settings.events.js";

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

//event handlers
export const meditationSettingsEventHandlers = new Map();
meditationSettingsEventHandlers.set(
    meditationSettingsEvents.gongToggled,
    (state) => ({
        ...state,
        gongOff: !state.gongOff
    })
);
meditationSettingsEventHandlers.set(
    meditationSettingsEvents.moreMeditationTimeRequested,
    (state) => ({
        ...state,
        meditationDurationInMinutes: calculateIncrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
    })
);
meditationSettingsEventHandlers.set(
    meditationSettingsEvents.lessMeditationTimeRequested,
    (state) => ({
        ...state,
        meditationDurationInMinutes: calculateDecrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
    })
);
meditationSettingsEventHandlers.set(
    meditationSettingsEvents.morePreparationTimeRequested,
    (state) => ({
        ...state,
        preparationDurationInSeconds: calculateIncrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
    })
);
meditationSettingsEventHandlers.set(
    meditationSettingsEvents.lessPreparationTimeRequested,
    (state) => ({
        ...state,
        preparationDurationInSeconds: calculateDecrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
    })
);