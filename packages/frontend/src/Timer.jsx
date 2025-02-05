import "./Timer.css";
import {useState, useEffect} from 'react';
import {wakeLockService} from './WakeLockService';
import {gongService} from './GongService';
import {onTimerTicked, onTimerStarted} from "domain/src/timer/stateUpdaters.js";
import {getFormattedTime, isTimerRunning, isTimeUp} from "domain/src/timer/selectors.js";

function Timer({totalSeconds}) {
    const [timerState, setTimerState] = useState({totalSeconds});

    const intervalCallBack  = () => {
        setTimerState(onTimerTicked(timerState, Date.now()));
        if(isTimeUp(timerState)){
            gongService.play();
        }
    }
    useEffect(() => {
        let interval;
        if(isTimerRunning(timerState)){
            interval = setInterval(intervalCallBack, 1000);
        }
        return () => {
            clearInterval(interval);
            wakeLockService.releaseWakeLock();
        };
    }, [isTimerRunning(timerState)]);


    useEffect(() => () => gongService.stop(), []);

    const startTimer = () =>  {
        wakeLockService.requestWakeLock();
        gongService.play();
        setTimerState(onTimerStarted(timerState, Date.now()));
    };

    return <>
        {
            isTimerRunning(timerState) ?
                <h1 className="timer">{getFormattedTime(timerState)}</h1> :
                <button className="mainAction" onClick={startTimer}>
                    Start
                </button>
        }
    </>;
}

export default Timer;