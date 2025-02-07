import "./DurationSelect.css"
import {useEffect, useState} from 'react';
import Timer from "../timer/Timer.jsx";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import '../../config/i18n';
import { useTranslation } from 'react-i18next';


const suggestedDurations = [20, 10, 5];

export default function DurationSelect() {
    const { t } = useTranslation();
    const [duration, setDuration] = useState(null);
    const [dailyStreak, setDailyStreak] = useState(null);

    // Fetch dailyStreak from the API on component mount
    useEffect(() => {
        meditationRepository.fetchDailyStreak().then(setDailyStreak);
    }, []);

    return (
        <div>
            {duration ?
                <>
                    <div className="timer-box"><Timer totalSeconds={duration*60}/></div>
                    <a className="clickable" onClick={() => setDuration(null)}>←
                        {t('back')}</a>
                </> :
                <>
                    <p>{t('duration')}</p>
                    <ul className="mainAction">
                        {suggestedDurations.map(minuteCount => (
                            <li key={minuteCount}>
                                <button className="clickable" onClick={() => setDuration(minuteCount)}>
                                    {t('minutes', {minuteCount})}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {dailyStreak > 1&&<p>t('days_in_a_row', {dailyStreak})</p>}
                </>
            }
        </div>
    )
        ;
}
