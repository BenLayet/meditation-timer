import "./Timer.css";
import { useState, useEffect } from 'react';
import WakeLockService from './WakeLockService';
import { onTimerTicked } from "domain/src/timer/onTimerTicked.js";
import { onTimerStarted } from "domain/src/timer/onTimerStarted.js";

function Timer({ initialState }) {
    const [state, setState] = useState(initialState);
    const wakeLockService = new WakeLockService();
    const bowlAudio = new Audio('/bowl.ogg');
    useEffect(() => {
        const interval = setInterval(() => {
            setState(onTimerTicked(state));
            if(state.seconds === 12 && state.isRunning) {
                bowlAudio.play();
            }
        }, 1000);
        return () => {
            clearInterval(interval);
            wakeLockService.release();
        };
    }, [state]);

    const startTimer = () => {
        setState(onTimerStarted(state));
        wakeLockService.request();
        bowlAudio.play();
    };

    const formattedTime = () => formatTime(state.seconds);

    return <>
        {
            state.timerIsRunning ?
                <h1 className="timer">{formattedTime()}</h1> :
                <button className="mainAction" onClick={startTimer}>
                    Start
                </button>
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