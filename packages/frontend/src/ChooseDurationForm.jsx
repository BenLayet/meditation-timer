import "./ChooseDurationForm.css"
import {useState} from 'react';
import Timer from "./Timer.jsx";

export default function ChooseDurationForm() {
    const durations = [1200, 600, 300];
    const [totalSeconds, setTotalSeconds] = useState(null);

    return (
        <div>
            {totalSeconds ?
                <>
                    <div className="timer-box"><Timer totalSeconds={totalSeconds}/></div>
                    <a className="clickable" onClick={() => setTotalSeconds(null)}>← back</a>
                </> :
                <>
                    <h1>Choose length</h1>
                    <ul className="mainAction">
                        {durations.map(duration => (
                            <li key={duration}>
                                <button className="clickable" onClick={() => setTotalSeconds(duration)}>
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
