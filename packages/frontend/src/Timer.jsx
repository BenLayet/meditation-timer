import "./Timer.css";
import { useState, useEffect, useRef } from 'react';
import NoSleep from 'nosleep.js';
import { onSecondElapsed } from "domain/src/timer/onSecondElapsed.js";
import { onTimerStarted } from "domain/src/timer/onTimerStarted.js";

function Timer({ initialState }) {
    const [state, setState] = useState(initialState);
    const noSleep = useRef(new NoSleep());

    useEffect(() => {
        const interval = setInterval(() => {
            setState(onSecondElapsed(state));
        }, 1000);
        return () => {
            clearInterval(interval);
            noSleep.current.disable();
        };
    }, [state]);

    const startTimer = () => {
        setState(onTimerStarted(state));
        noSleep.current.enable();
    };

    const formattedTime = () => formatTime(state.seconds);

    return <>
        {
            state.isRunning ?
                <h1 className="timer">{formattedTime()}</h1> :
                <button className="mainAction" onClick={startTimer} disabled={state.isRunning}>Start {formattedTime()}</button>
        }
    </>;
}

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secondsStr = String(totalSeconds % 60).padStart(2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
};

export default Timer;