export function onTimerStopped(state){
    console.debug('onTimerStopped', JSON.stringify(state));
    return {...state, isRunning: false};
}