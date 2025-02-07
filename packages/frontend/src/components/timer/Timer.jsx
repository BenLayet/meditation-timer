import "./Timer.css";
import {useState, useEffect} from 'react';
import {wakeLockService} from '../../services/wakeLockService.js';
import {gongService} from '../../services/gongService.js';
import {onTimerTicked, onTimerStarted} from "domain/src/timer/stateUpdaters.js";
import {getFormattedTime, hasTimerStarted, isTimerRunning, isTimeUp} from "domain/src/timer/selectors.js";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import {useTranslation} from "react-i18next";import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


function Timer({totalSeconds}) {
    const { t } = useTranslation();
    const [timerState, setTimerState] = useState({totalSeconds});

    const intervalCallBack  = () => {
        const updatedState = onTimerTicked(timerState, Date.now());
        if(isTimeUp(updatedState)){
            gongService.play();
            meditationRepository.postMeditation(updatedState)
                .then(r => console.log(r));
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
            hasTimerStarted(timerState) ?
                <h1 className="timer">{getFormattedTime(timerState)}</h1> :
                <button className="mainAction" onClick={startTimer} aria-description={t('start_timer')}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
        }
    </>;
}

export default Timer;