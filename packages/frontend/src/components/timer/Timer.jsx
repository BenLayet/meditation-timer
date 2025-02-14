import "./Timer.css";
import {useContext} from 'react';
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {appSelectors} from "domain/src/app/app.selectors.js";
import {GlobalStateContext} from "../app/GlobalStateContext.jsx";
import {
    gongVolumeSet,
    meditationDurationSet,
    meditationSessionStarted,
    meditationSessionStopped
} from "domain/src/meditation-session/meditation-session.events.js";


function Timer() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(GlobalStateContext);
    const playClicked = () => dispatch(meditationSessionStarted(new Date().getTime()));
    const stopClicked = () => dispatch(meditationSessionStopped(new Date().getTime()));
    const meditationDurationChanged = (event) => dispatch(meditationDurationSet(event.target.value));
    const gongVolumeChanged = (event) => dispatch(gongVolumeSet(event.target.value));
    const canDurationBeChanged = () => appSelectors.canDurationBeChanged(state);
    const canMeditationSessionBeStarted = () => appSelectors.canMeditationSessionBeStarted(state);
    const formattedTimeToDisplay = () => appSelectors.getFormattedTimeToDisplay(state);
    const gongVolume = () => appSelectors.getGongVolume(state);
    const durationInMinutes = () => appSelectors.getMeditationDurationInMinutes(state);

    return <>
        <h1 className="timer">{formattedTimeToDisplay()}</h1>
        {
            canMeditationSessionBeStarted() ?
                <button className="mainAction" onClick={playClicked}>
                    <FontAwesomeIcon icon={faPlay}/>
                </button>
                :
                <button className="mainAction" onClick={stopClicked}>
                    <FontAwesomeIcon icon={faStop}/>
                </button>
        }
        <div className={`timer-settings ${canDurationBeChanged() || "hidden"}`}>
            <div className="timer-setting">
                <label htmlFor="duration">{t('duration')}</label>
                <input
                    id="duration"
                    type="range"
                    min="5"
                    max="45"
                    step="5"
                    value={durationInMinutes()}
                    onChange={meditationDurationChanged}
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
                    value={gongVolume()}
                    onChange={gongVolumeChanged}
                />
            </div>
        </div>
    </>;
}

export default Timer;