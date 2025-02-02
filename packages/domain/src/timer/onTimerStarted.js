export function onTimerStarted(state){
    console.debug('onTimerStarted', JSON.stringify(state));
    return {
        ...state,
        isRunning: true,
        seconds: state.duration
    };
}