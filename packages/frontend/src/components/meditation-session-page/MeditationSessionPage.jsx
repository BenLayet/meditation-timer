import "./MeditationSessionPage.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStop} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {
    meditationSessionStopRequested
} from "domain/src/components/meditation-session/meditation-session.events.js";
import Preparation from "../preparation/Preparation.jsx";
import Timer from "../timer/Timer.jsx";
import {InspiringImage} from "../inspiring-image/InspiringImage.jsx";

function MeditationSessionPage() {
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const stopClicked = () => dispatch(meditationSessionStopRequested());
    //selectors
    const meditationRemainingTime = appSelectors.actualMeditation.displayedTime(state);
    const preparationIsRunning = appSelectors.preparation.isRunning(state);
    const actualMeditationIsRunning = appSelectors.actualMeditation.isRunning(state);
    return <>
    <InspiringImage />
    <div className="stack-layout timer-zone flex-column">
        <div className={'stack-layout-tallest-child fade-in ' + (preparationIsRunning ? 'visible' : 'hidden')}>
            <Preparation/>
        </div>
        <div className={'fade-in  ' + (actualMeditationIsRunning ? 'visible' : 'hidden')}>
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