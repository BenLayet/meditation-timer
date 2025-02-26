import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import Timer from "../timer/Timer.jsx";

function ActualMeditationTimer() {
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch({eventType: 'ADD_TIME'});
    const removeTimeClicked = () => dispatch({eventType: 'REMOVE_TIME'});
    //selectors
    const meditationRemainingTime = appSelectors.actualMeditation.displayedTime(state);
    return <Timer displayedTime={meditationRemainingTime}
                  addTimeClicked={addTimeClicked}
                  removeTimeClicked={removeTimeClicked}/>
        ;
}

export default ActualMeditationTimer;