import "./DurationSelect.css"
import {useEffect, useState} from 'react';
import Timer from "../timer/Timer.jsx";
import {meditationRepository} from "../../repositories/meditationRepository.js";

export default function DurationSelect() {
    const durations = [1200, 600, 300];
    const [totalSeconds, setTotalSeconds] = useState(null);
    const [dailyStreak, setDailyStreak] = useState(null);

    // Fetch dailyStreak from the API on component mount
    useEffect(() => {
        meditationRepository.fetchDailyStreak().then(setDailyStreak);
    }, []);

    return (
        <div>
            {totalSeconds ?
                <>
                    <div className="timer-box"><Timer totalSeconds={totalSeconds}/></div>
                    <a className="clickable" onClick={() => setTotalSeconds(null)}>← back</a>
                </> :
                <>

                    <ul className="mainAction">
                        {durations.map(duration => (
                            <li key={duration}>
                                <button className="clickable" onClick={() => setTotalSeconds(duration)}>
                                    {duration / 60} minutes
                                </button>
                            </li>
                        ))}
                    </ul>
                    {dailyStreak > 1&&<p>{dailyStreak} days in a row</p>}
                </>
            }
        </div>
    )
        ;
}
