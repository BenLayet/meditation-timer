import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {useTranslation} from "react-i18next";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import "./Statistics.css";

export function Statistics() {
    const {t} = useTranslation();
    const {state} = useContext(AppStateContext);
    //selectors
    const dailyStreak = appSelectors.statistics.dailyStreak(state);
    const hourCount = appSelectors.statistics.hourCountThisWeek(state);
    const minuteCount = appSelectors.statistics.minuteCountThisWeek(state);
    const shouldTotalMinutesThisWeekBeDisplayed = appSelectors.statistics.shouldTotalMinutesThisWeekBeDisplayed(state);
    const shouldDailyStreakBeDisplayed = appSelectors.statistics.shouldDailyStreakBeDisplayed(state);

    return (
        <ul>
            {shouldTotalMinutesThisWeekBeDisplayed &&
                <li>{t("hourCount", hourCount)}
                    {t("minuteCount", minuteCount)}
                    {t("thisWeek")}</li>}
            {shouldDailyStreakBeDisplayed &&
                <li>{t("dailyStreak", {dailyStreak})}</li>}

        </ul>
    )
}