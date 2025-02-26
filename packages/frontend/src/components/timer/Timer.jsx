import "./Timer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Timer({displayedTime, addTimeClicked, removeTimeClicked}) {
    return <div className="timer">
        <div className='timer-display'>{displayedTime}</div>
        <div className='timer-controls'>
            <button onClick={removeTimeClicked}>
                <FontAwesomeIcon icon={faMinus}/></button>
            <button onClick={addTimeClicked}>
                <FontAwesomeIcon icon={faPlus}/></button>
        </div>
    </div>
}

export default Timer;