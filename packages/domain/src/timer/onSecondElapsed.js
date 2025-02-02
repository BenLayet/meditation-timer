export function onSecondElapsed(state){
    const seconds = Math.max(0, state.seconds - (state.isRunning ? 1 : 0));
    const isRunning = state.isRunning && seconds > 0;
    return {...state, seconds, isRunning};
}