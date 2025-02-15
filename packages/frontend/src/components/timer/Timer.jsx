import "./Timer.css";
import {timerSelectors} from "domain/src/timer/timer.selectors.js";

function Timer({timerState}) {
    return <h1 className="timer">{timerSelectors.getFormattedTimeToDisplay(timerState)}</h1>
}

export default Timer;