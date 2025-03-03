import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import Timer from "../timer/Timer.jsx";
import {
    moreTimeDuringPreparationRequested,
    skipPreparationRequested
} from "domain/src/components/preparation/preparation.events.js";
import "./Preparation.css";

function Preparation() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(moreTimeDuringPreparationRequested());
    const skipClicked = () => dispatch(skipPreparationRequested());
    //selectors
    const preparationRemainingTime = appSelectors.preparation.displayedTime(state);
    const timeIncrementInSeconds = appSelectors.preparation.timeIncrementInSeconds(state);
    return (<div className="subtle">
            <p>{t("preparation")}</p>
            <Timer
                displayedTime={preparationRemainingTime}/>
            <div className="flex-column">
                <button
                    className="round-rectangle-button"
                    onClick={addTimeClicked}>
                    +{timeIncrementInSeconds}s
                </button>
                <a onClick={skipClicked}>Skip</a>
            </div>
        </div>);
}

export default Preparation;