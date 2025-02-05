import { isTimeUp} from "./selectors.js";
import {TIME_UP_REACHED} from "./events.js";

export function onTimerTicked(timerState, eventChain){
    if(isTimeUp(timerState)){
        eventChain.postEvent(TIME_UP_REACHED);
    }
}