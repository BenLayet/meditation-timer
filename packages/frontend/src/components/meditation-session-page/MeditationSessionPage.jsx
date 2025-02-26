import "./MeditationSessionPage.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "domain/src/components/meditation-session/meditation-session.events.js";
import Preparation from "../preparation/Preparation.jsx";
import ActualMeditationTimer from "../actual-mediation-timer/ActualMeditationTimer.jsx";

const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);

function MeditationSessionPage() {
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const playClicked = () => dispatch(meditationSessionStartRequested(currentTimeInSeconds()));
    const stopClicked = () => dispatch(meditationSessionStopRequested());
    const mediationCanBeStarted = appSelectors.canMeditationSessionBeStarted(state);
    const meditationCanBeStopped = appSelectors.canMeditationSessionBeStopped(state);
    return <>
        <Preparation/>
        <ActualMeditationTimer/>
        {mediationCanBeStarted && <button className="mainAction" onClick={playClicked}>
            <FontAwesomeIcon icon={faPlay}/>
        </button>}
        {meditationCanBeStopped && <button className="mainAction" onClick={stopClicked}>
            <FontAwesomeIcon icon={faStop}/>
        </button>}
    </>;
}

export default MeditationSessionPage;