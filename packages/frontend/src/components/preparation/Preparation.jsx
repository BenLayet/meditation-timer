import {useTranslation} from "react-i18next";
import Timer from "../timer/Timer.jsx";
import "./Preparation.css";

function Preparation({vm}) {
    const {t} = useTranslation();
    //actions
    const addTimeClicked = vm.events.moreTimeRequested;
    const skipClicked = vm.events.skipRequested;
    //selectors
    const preparationRemainingTime = vm.selectors.remainingTime();
    const timeIncrementInSeconds = vm.selectors.timeIncrementInSeconds();
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