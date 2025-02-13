export function onSessionStarted(sessionState, {currentTimestampInSeconds}) {
    return {
        ...sessionState,
        startedTimestampInSecond: currentTimestampInSeconds,
    };
}
export function onSecondElapsed(sessionState, {currentTimestampInSeconds}) {
    return {
        ...sessionState,
        startedTimestampInSecond: currentTimestampInSeconds,
    };
}
