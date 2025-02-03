export function onDurationSelected(state, duration){
    return {...state,duration, seconds: duration, timerIsRunning: false, timerIsDisplayed:true};
}