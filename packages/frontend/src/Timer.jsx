import "./Timer.css"
import { useState, useEffect } from 'react';
import {onSecondElapsed} from "domain/src/timer/onSecondElapsed.js";
import {onTimerStarted} from "domain/src/timer/onTimerStarted.js";
import {onTimerStopped} from "domain/src/timer/onTimerStopped.js";
import {onTimerReset} from "domain/src/timer/onTimerReset.js";

function Timer() {
    const initialSate = {isRunning: false, seconds:0};
    const [state, setState] = useState(initialSate);
    useEffect(() => {
        const interval = setInterval(() => {
            setState(onSecondElapsed(state));
        }, 1000);
        return () => clearInterval(interval);
    });
    const startTimer = () =>  setState(onTimerStarted(state));
    const stopTimer = () =>  setState(onTimerStopped(state));
    const resetTimer = () => setState(onTimerReset(state));

    const formattedTime = () => formatTime(state.seconds);

    return (
        <div>
            <h1 className="timer">{formattedTime()}</h1>
            <button onClick={startTimer} disabled={state.isRunning}>Start</button>
            <button onClick={stopTimer} disabled={!state.isRunning}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secondsStr = String(totalSeconds % 60).padStart(2, '0');
    return hours>0? `${hoursStr}:${minutesStr}:${secondsStr}`:`${minutesStr}:${secondsStr}`;
};
export default Timer;