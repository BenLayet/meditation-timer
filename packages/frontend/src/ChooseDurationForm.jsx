import "./ChooseDurationForm.css"
import {useState} from 'react';
import Timer from "./Timer.jsx";
import {onDurationSet} from "domain/src/timer/onDurationSet.js";
import {onTimerReset} from "domain/src/timer/onTimerReset.js";

export default function ChooseDurationForm() {
    const [state, setState] = useState({});

    const handleDurationClick = (duration) => {
        setState(onDurationSet(state, duration));
        console.log(JSON.stringify(state));
    };
    const resetTimer = () => setState(onTimerReset(state));
    const durations = [1200, 600, 300];
    return (
        <div>
            {state.duration ?
                <>
                    <div className="timer-box"><Timer initialState={state}/></div>
                    <a className="clickable" onClick={resetTimer}>← back</a>
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
