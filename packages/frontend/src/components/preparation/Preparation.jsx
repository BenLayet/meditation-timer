import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import Timer from "../timer/Timer.jsx";

function Preparation() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch({eventType: 'ADD_TIME'});
    const removeTimeClicked = () => dispatch({eventType: 'REMOVE_TIME'});
    //selectors
    const preparationIsRunning = appSelectors.preparation.isRunning(state);
    const preparationRemainingTime = appSelectors.preparation.displayedTime(state);
    return (
        <div className={'subtle fadeIn ' + (preparationIsRunning ? 'visible' : 'hidden')}>
            <p>{t("preparation")}</p>
            <Timer
                displayedTime={preparationRemainingTime}
                addTimeClicked={addTimeClicked}
                removeTimeClicked={removeTimeClicked}/>
        </div>
    );
}

export default Preparation;