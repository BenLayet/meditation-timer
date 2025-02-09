import "./Timer.css";
import {useState, useEffect} from 'react';
import {wakeLockService} from '../../services/wakeLockService.js';
import {gongService} from '../../services/gongService.js';
import {onTimerTicked, onTimerStarted, onTimerCancelled} from "domain/src/timer/stateUpdaters.js";
import {getFormattedTime, hasTimerStarted, isTimerRunning, isTimeUp} from "domain/src/timer/selectors.js";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import {useTranslation} from "react-i18next";import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';


function Timer() {
    const { t } = useTranslation();
    const [volume, setVolume] = useState(100);
    const [timerState, setTimerState] = useState({totalSeconds:1200});
    const [dailyStreak, setDailyStreak] = useState(null);

    // Fetch dailyStreak from the API on component mount
    useEffect(() => {
        meditationRepository.fetchDailyStreak().then(setDailyStreak);
    }, []);

    useEffect(() => {
        const duration = localStorage.getItem('duration');
        if (duration) {
            const totalSeconds = parseInt(duration)*60;
            setTimerState({totalSeconds});
        }
        const volume = localStorage.getItem('volume');
        if (volume) {
            setVolume(parseInt(volume));
        }
    }, []);

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
    const cancelTimer = () =>  {
        wakeLockService.releaseWakeLock();
        gongService.stop();
        setTimerState(onTimerCancelled(timerState));
    };
    const handleDurationChange = (event) => {
        const newDuration = event.target.value;
        setTimerState({totalSeconds: newDuration*60});
        localStorage.setItem('duration', newDuration);
    };
    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        setVolume(volume);
        gongService.setVolume(volume);
        localStorage.setItem('volume', volume);
    };

    return <>
        <h1 className="timer">{getFormattedTime(timerState)}</h1>
        {
            hasTimerStarted(timerState)?
                <button className="mainAction" onClick={cancelTimer}   >
                    <FontAwesomeIcon icon={faStop} />
                </button>
                :
                <button className="mainAction" onClick={startTimer}   >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
        }
        <div className={`timer-settings ${isTimerRunning(timerState) && "hidden"}`}>
            <div className="timer-setting">
                <label htmlFor="duration">{t('duration')}</label>
                <input
                    id="duration"
                    type="range"
                    min="5"
                    max="45"
                    step="5"
                    value={timerState.totalSeconds / 60}
                    onChange={handleDurationChange}
                />
            </div>
            <div className="timer-setting">
                <label htmlFor="volume">{t('volume')}</label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
        {dailyStreak > 1 &&
            <p>{t('days_in_a_row', {dailyStreak})}</p>
        }
    </>;
}

export default Timer;