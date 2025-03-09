import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import Timer from "../timer/Timer.jsx";
import {preparationEvents} from "domain/src/components/preparation/preparation.events.js";
import "./Preparation.css";
import {preparationSelectors} from "domain/src/components/preparation/preparation.selectors.js";

function Preparation({preparationState}) {
    const {t} = useTranslation();
    const {dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(preparationEvents.moreTimeRequested);
    const skipClicked = () => dispatch(preparationEvents.skipRequested);
    //selectors
    const preparationRemainingTime = preparationSelectors.remainingTime(preparationState);
    const timeIncrementInSeconds = preparationSelectors.timeIncrementInSeconds(preparationState);
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
            <a onClick={skipClicked}>{t("skip")}</a>
        </div>
    </div>);
}

export default Preparation;