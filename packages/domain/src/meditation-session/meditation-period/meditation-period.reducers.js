export function onSessionStarted(state, {currentTimestampInSeconds}) {
    return {
        ...state,
        startedTimestampInSecond: currentTimestampInSeconds,
    };
}
export function onSecondElapsed(state, {currentTimestampInSeconds}) {
    return {
        ...state,
        startedTimestampInSecond: currentTimestampInSeconds,
    };
}
