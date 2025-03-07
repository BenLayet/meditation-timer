import "./MeditationSessionPage.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStop} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {meditationSessionStopRequested} from "domain/src/features/meditation-session/meditation-session.events.js";
import Preparation from "../preparation/Preparation.jsx";
import Timer from "../timer/Timer.jsx";
import {InspiringImage} from "../inspiring-image/InspiringImage.jsx";
import {meditationSessionSelectors} from "domain/src/features/meditation-session/meditation-session.feature.js";

function MeditationSessionPage({meditationSessionState}) {
    const {dispatch} = useContext(AppStateContext);
    //actions
    const stopClicked = () => dispatch(meditationSessionStopRequested());
    //selectors
    const preparationIsRunning = meditationSessionSelectors.preparationIsRunning(meditationSessionState);
    const preparationState = meditationSessionSelectors.preparationState(meditationSessionState);
    const meditationIsRunning = meditationSessionSelectors.meditationIsRunning(meditationSessionState);
    const meditationRemainingTime = meditationSessionSelectors.meditationRemainingTime(meditationSessionState);
    return <>
        <InspiringImage/>
        <div className="stack-layout timer-zone flex-column">
            <div className={'stack-layout-tallest-child fade-in ' + (preparationIsRunning ? 'visible' : 'hidden')}>
                <Preparation preparationState={preparationState}/>
            </div>
            <div className={'fade-in  ' + (meditationIsRunning ? 'visible' : 'hidden')}>
                <Timer displayedTime={meditationRemainingTime}/>
            </div>
        </div>
        <button className="main-action" onClick={stopClicked}>
            <FontAwesomeIcon icon={faStop}/>
        </button>
    </>
        ;
}

export default MeditationSessionPage;