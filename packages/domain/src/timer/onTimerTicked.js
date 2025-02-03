export function onTimerTicked(state){
    const seconds = Math.max(0, state.seconds - (state.timerIsRunning ? 1 : 0));
    const timerIsRunning = state.timerIsRunning && seconds > 0;
    return {...state, seconds, timerIsRunning};
}