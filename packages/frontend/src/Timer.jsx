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

    return (
        <div>
            <h2>Timer: {state.seconds} seconds</h2>
            <button onClick={startTimer} disabled={state.isRunning}>Start</button>
            <button onClick={stopTimer} disabled={!state.isRunning}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default Timer;