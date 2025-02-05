import "./Timer.css";
import {useState, useEffect} from 'react';
import {wakeLockService} from './WakeLockService';
import {gongService} from './GongService';
import {onTimerTicked, onTimerStarted} from "domain/src/timer/stateUpdaters.js";
import {getFormattedTime, isTimerRunning, isTimeUp} from "domain/src/timer/selectors.js";
import DeviceUuidService from "./DeviceUuidService.js";

function Timer({totalSeconds}) {
    const [timerState, setTimerState] = useState({totalSeconds});

    const intervalCallBack  = () => {
        const updatedState = onTimerTicked(timerState, Date.now());
        if(isTimeUp(updatedState)){
            gongService.play();
            postMeditation(updatedState)
                .then(r => console.log('Meditation saved:', r))
                .catch(e => console.error('Error posting meditation:', e));
        }
        setTimerState(updatedState);
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

async function postMeditation  (timerState) {

    const meditation = {
        started: timerState.startedTimestampMs,
        ended: timerState.lastTickTimestampMs,
        deviceUuid: DeviceUuidService.getOrCreateUuid()
    };

    try {
        const response = await fetch('/api/v1/meditations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meditation)
        });
        console.log('Meditation posted:', response.status);
    } catch (error) {
        console.error('Error posting meditation:', error);
    }
}
export default Timer;