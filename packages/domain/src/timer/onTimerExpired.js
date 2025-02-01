export function onTimerExpired(state){
    console.debug('onTimerExpired', JSON.stringify(state));
    return {...state, isRunning: false};
}