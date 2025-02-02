export function onDurationSet(state, duration){
    return {...state,duration, seconds: duration, isRunning: false};
}