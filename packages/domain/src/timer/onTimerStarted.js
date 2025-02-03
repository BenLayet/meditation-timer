export function onTimerStarted(state){
    return {
        ...state,
        timerIsRunning: true,
        seconds: state.duration
    };
}