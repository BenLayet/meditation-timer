export function onTimerReset(state){
    console.debug('onTimerReset', JSON.stringify(state));
    return {isRunning: false};
}