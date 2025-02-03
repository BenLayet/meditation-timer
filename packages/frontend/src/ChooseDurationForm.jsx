import "./ChooseDurationForm.css"
import {useState} from 'react';
import Timer from "./Timer.jsx";
import {onDurationSelected} from "domain/src/duration-selection/onDurationSelected.js";
import {onDurationReset} from "domain/src/duration-selection/onDurationReset.js";

export default function ChooseDurationForm() {
    const durations = [1200, 600, 300];
    const [state, setState] = useState({});
    const handleDurationClick = (duration) => {
        setState(onDurationSelected(state, duration));
    };
    const backClicked = () => setState(onDurationReset(state));

    return (
        <div>
            {state.timerIsDisplayed ?
                <>
                    <div className="timer-box"><Timer initialState={state}/></div>
                    <a className="clickable" onClick={backClicked}>← back</a>
                </> :
                <>
                    <h1>Choose length</h1>
                    <ul className="mainAction">
                        {durations.map(duration => (
                            <li key={duration}>
                                <button className="clickable" onClick={() => handleDurationClick(duration)}>
                                    {duration / 60} minutes
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    )
        ;
}
