import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {useTranslation} from "react-i18next";
import "./Statistics.css";
import {statisticsSelectors} from "domain/src/features/statistics/statistics.selectors.js";

export function Statistics({statisticsState}) {
    const {t} = useTranslation();
    //selectors
    const dailyStreak = statisticsSelectors.dailyStreak(statisticsState);
    const hourCount = statisticsSelectors.hourCountThisWeek(statisticsState);
    const minuteCount = statisticsSelectors.minuteCountThisWeek(statisticsState);
    const shouldTotalMinutesThisWeekBeDisplayed = statisticsSelectors.shouldTotalMinutesThisWeekBeDisplayed(statisticsState);
    const shouldDailyStreakBeDisplayed = statisticsSelectors.shouldDailyStreakBeDisplayed(statisticsState);

    return (
        <ul className="statistics">
            {shouldTotalMinutesThisWeekBeDisplayed &&
                <li className="statistics-item">{t("hourCount", hourCount)}
                    {t("minuteCount", minuteCount)}
                    {t("thisWeek")}</li>}
            {shouldDailyStreakBeDisplayed &&
                <li className="statistics-item">{t("dailyStreak", {dailyStreak})}</li>}

        </ul>
    )
}