export function onTimerStarted(state){
    console.debug('onTimerStarted', JSON.stringify(state));
    return {...state, isRunning: true, seconds: 0, startedAt: new Date()};
}