import "./Timer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {appSelectors} from "domain/src/meditation-timer.app.js";

function Timer() {
    const {state, dispatch} = useContext(AppStateContext);
    const addTimeClicked = () => {
    };
    const removeTimeClicked = () => {
    };

    const displayedTime = appSelectors.actualMeditation.displayedTime;

    return <div className="timer">
        <div className='timer-display'>{displayedTime(state)}</div>
        <div className='timer-controls'>
            <button onClick={removeTimeClicked}>
                <FontAwesomeIcon icon={faMinus}/></button>
            <button onClick={addTimeClicked}>
                <FontAwesomeIcon icon={faPlus}/></button>
        </div>
    </div>
}

export default Timer;