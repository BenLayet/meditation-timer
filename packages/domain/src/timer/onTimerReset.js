export function onTimerReset(state){
    console.debug('onTimerReset', JSON.stringify(state));
    return {...state, isRunning: false, seconds:0};
}