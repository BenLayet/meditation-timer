import {floor, max} from "lodash-es";
import ow from "ow";

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

//events
export const meditationSettingsEvents = {
    moreMeditationTimeRequested: {
        eventType: "moreMeditationTimeRequested",
        handler: (state) => ({
            ...state,
            meditationDurationInMinutes: calculateIncrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
        })
    },
    lessMeditationTimeRequested: {
        eventType: "lessMeditationTimeRequested",
        handler: (state) => ({
            ...state,
            meditationDurationInMinutes: calculateDecrementedDuration(state.meditationDurationInMinutes, state.meditationIncrementInMinutes)
        })
    },
    morePreparationTimeRequested: {
        eventType: "morePreparationTimeRequested",
        handler: (state) => ({
            ...state,
            preparationDurationInSeconds: calculateIncrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
        })
    },
    lessPreparationTimeRequested: {
        eventType: "lessPreparationTimeRequested",
        handler: (state) => ({
            ...state,
            preparationDurationInSeconds: calculateDecrementedDuration(state.preparationDurationInSeconds, state.preparationIncrementInSeconds)
        })
    },
    gongToggled: {
        eventType: "gongToggled",
        handler: (state) => ({
            ...state,
            gongOff: !state.gongOff
        })
    },
    gongOffToggled: {
        eventType: "gongOffToggled"
    },
    gongOnToggled: {
        eventType: "gongOnToggled"
    },
    startSessionRequested:{
        eventType:"startSessionRequested",
        payloadShape:{
            currentTimeInSeconds: ow.number.positive,
        }
    }
};
