import "./MeditationSessionPage.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {
    meditationSessionResetRequested,
    meditationSessionStartRequested
} from "domain/src/components/meditation-session/meditation-session.events.js";
import Preparation from "../preparation/Preparation.jsx";
import Timer from "../timer/Timer.jsx";
import NextMeditationControls from "../next-meditation-controls/NextMeditationControls.jsx";
import {Statistics} from "../statistics/Statistics.jsx";

const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);

function MeditationSessionPage() {
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const playClicked = () => dispatch(meditationSessionStartRequested(currentTimeInSeconds()));
    const stopClicked = () => dispatch(meditationSessionResetRequested());
    //selectors
    const mediationCanBeStarted = appSelectors.canMeditationSessionBeStarted(state);
    const canDurationBeChanged = appSelectors.canDurationBeChanged(state);
    const meditationCanBeReset = appSelectors.canMeditationSessionBeReset(state);
    const meditationRemainingTime = appSelectors.actualMeditation.displayedTime(state);
    const preparationIsRunning = appSelectors.preparation.isRunning(state);
    const actualMeditationIsRunning = appSelectors.actualMeditation.isRunning(state);
    const actualMeditationTimerIsVisible = appSelectors.actualMeditationTimerIsVisible(state);
    const statisticsShouldBeDisplayed = appSelectors.statisticsShouldBeDisplayed(state);
    return <>
        <div className="stack-layout timer-interaction-zone">
            <div className={'fadeIn ' + (preparationIsRunning ? 'visible' : 'hidden')}>
                <Preparation/>
            </div>
            <div className={'suzuki fadeIn ' + (actualMeditationIsRunning ? 'visible dignifiedFadeIn' : 'hidden')}>
            </div>
            <div className={'fadeIn ' + (statisticsShouldBeDisplayed ? 'visible' : 'hidden')}>
                <Statistics/>
            </div>
        </div>
        <div className={'fadeIn ' + (actualMeditationTimerIsVisible ? 'visible' : 'hidden')}>
            <Timer displayedTime={meditationRemainingTime}/>
        </div>
        <div className={'fadeIn ' + (canDurationBeChanged ? 'visible' : 'hidden')}>
            <NextMeditationControls/>
        </div>

        {mediationCanBeStarted && <button className="mainAction" onClick={playClicked}>
            <FontAwesomeIcon icon={faPlay}/>
        </button>}
        {meditationCanBeReset && <button className="mainAction" onClick={stopClicked}>
            <FontAwesomeIcon icon={faStop}/>
        </button>}
    </>;
}

export default MeditationSessionPage;