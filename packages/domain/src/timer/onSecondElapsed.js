export function onSecondElapsed(state){
    console.debug('onSecondElapsed', JSON.stringify(state));
    const seconds = state.seconds + (state.isRunning ? 1 : 0);
    return {...state, seconds};
}