export function onTimerStarted(state, startedTimestampMs){
    return {
        ...state,
        startedTimestampMs,
        lastTickTimestampMs: startedTimestampMs
    };
}
export function onTimerTicked(state, currentTimestampMs){
    return {...state, lastTickTimestampMs: currentTimestampMs};
}