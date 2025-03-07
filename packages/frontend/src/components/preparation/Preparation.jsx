import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import Timer from "../timer/Timer.jsx";
import {
    moreTimeDuringPreparationRequested,
    skipPreparationRequested
} from "domain/src/features/preparation/preparation.events.js";
import "./Preparation.css";
import {preparationSelectors} from "domain/src/features/preparation/preparation.selectors.js";

function Preparation({preparationState}) {
    const {t} = useTranslation();
    const {dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(moreTimeDuringPreparationRequested());
    const skipClicked = () => dispatch(skipPreparationRequested());
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