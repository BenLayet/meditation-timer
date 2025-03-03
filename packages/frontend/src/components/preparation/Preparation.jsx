import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import Timer from "../timer/Timer.jsx";
import {moreTimeDuringPreparationRequested} from "domain/src/components/preparation/preparation.events.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "./Preparation.css";

function Preparation() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(moreTimeDuringPreparationRequested());
    //selectors
    const preparationRemainingTime = appSelectors.preparation.displayedTime(state);
    return (
        <div className="subtle">
            <p>{t("preparation")}</p>
            <Timer
                displayedTime={preparationRemainingTime}/>
            <div className="timer-controls">
                <FontAwesomeIcon
                    icon={faPlus}
                    onClick={addTimeClicked}
                    className="round-button"/>
            </div>
        </div>
    );
}

export default Preparation;