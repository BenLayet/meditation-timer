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
    return (
        <div>
            {state.duration ?
                <>
                    <div className="timer-box"><Timer initialState={state}/></div>
                    <a className="clickable" onClick={resetTimer}>← back</a>
                </> :
                <ul className="mainAction">
                    <li className="clickable" onClick={() => handleDurationClick(300)}>5 minutes</li>
                    <li className="clickable" onClick={() => handleDurationClick(600)}>10 minutes</li>
                    <li className="clickable" onClick={() => handleDurationClick(900)}>15 minutes</li>
                    <li className="clickable" onClick={() => handleDurationClick(1200)}>20 minutes</li>
                </ul>
            }
        </div>
    )
        ;
}
