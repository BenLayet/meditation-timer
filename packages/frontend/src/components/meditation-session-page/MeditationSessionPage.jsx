import "./MeditationSessionPage.css";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import Timer from "../timer/Timer.jsx";
import {useContext} from "react";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "domain/src/components/meditation-session/meditation-session.events.js";
import PreparationSpinner from "../preparation-spinner/PreparationSpinner.jsx";

const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);

function MeditationSessionPage() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    const playClicked = () => dispatch(meditationSessionStartRequested(currentTimeInSeconds()));
    const stopClicked = () => dispatch(meditationSessionStopRequested());
    const preparationIsRunning = appSelectors.preparation.isRunning(state);
    return <>
        {
            <div className={'subtle fadeIn ' + (preparationIsRunning ? 'visible':'hidden')}>
                <p>{t("preparation")}</p>
                <PreparationSpinner/>
            </div>
        }
        <Timer/>
        {appSelectors.canMeditationSessionBeStarted(state) ? <button className="mainAction" onClick={playClicked}>
            <FontAwesomeIcon icon={faPlay}/>
        </button> : <button className="mainAction" onClick={stopClicked}>
            <FontAwesomeIcon icon={faStop}/>
        </button>}
    </>;
}

export default MeditationSessionPage;