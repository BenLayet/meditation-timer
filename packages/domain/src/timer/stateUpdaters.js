export function onTimerStarted(state, currentTimestampMs){
    return {
        ...state,
        startedTimestampMs: currentTimestampMs,
        lastTickTimestampMs: currentTimestampMs
    };
}
export function onTimerTicked(state, currentTimestampMs){
    return {...state, lastTickTimestampMs: currentTimestampMs};
}

export function onTimerCancelled(state){
    return {
        totalSeconds: state.totalSeconds
    };
}