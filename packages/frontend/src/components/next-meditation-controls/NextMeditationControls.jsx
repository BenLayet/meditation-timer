import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {
    actualMeditationLessTimeRequested,
    actualMeditationMoreTimeRequested
} from "domain/src/components/actual-meditation/actual-meditation.events.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import "./NextMeditationControls.css";

function NextMeditationControls() {
    const { dispatch} = useContext(AppStateContext);
    //actions
    const addTimeClicked = () => dispatch(actualMeditationMoreTimeRequested());
    const removeTimeClicked = () => dispatch(actualMeditationLessTimeRequested());
    return (
        <div className="timer-controls">
            <button onClick={removeTimeClicked} className="timer-control">
                <FontAwesomeIcon icon={faMinus}/></button>
            <button onClick={addTimeClicked} className="timer-control">
                <FontAwesomeIcon icon={faPlus}/></button>
        </div>
    );
}

export default NextMeditationControls;