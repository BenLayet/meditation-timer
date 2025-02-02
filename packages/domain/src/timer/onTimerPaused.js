export function onTimerPaused(state){
    console.debug('onTimerPaused', JSON.stringify(state));
    return {...state, isRunning: false};
}