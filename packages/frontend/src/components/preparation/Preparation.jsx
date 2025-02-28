import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import Timer from "../timer/Timer.jsx";
import {
    preparationLessTimeRequested,
    preparationMoreTimeRequested
} from "domain/src/components/preparation/preparation.events.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Preparation() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(preparationMoreTimeRequested());
    const removeTimeClicked = () => dispatch(preparationLessTimeRequested());
    //selectors
    const preparationRemainingTime = appSelectors.preparation.displayedTime(state);
    return (
        <div className="subtle">
            <p>{t("preparation")}</p>
            <Timer
                displayedTime={preparationRemainingTime}/>
            <div className="timer-controls">
                <button onClick={removeTimeClicked} className="timer-control">
                    <FontAwesomeIcon icon={faMinus}/></button>
                <button onClick={addTimeClicked} className="timer-control">
                    <FontAwesomeIcon icon={faPlus}/></button>
            </div>
        </div>
    );
}

export default Preparation;