import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {useTranslation} from "react-i18next";
import {appSelectors} from "domain/src/meditation-timer.app.js";

export function Statistics() {
    const {t} = useTranslation();
    const {state} = useContext(AppStateContext);
    //selectors
    const dailyStreak = appSelectors.statistics.dailyStreak(state);
    const hourCountThisWeek = appSelectors.statistics.hourCountThisWeek(state);
    const minuteCountThisWeek = appSelectors.statistics.minuteCountThisWeek(state);
    const shouldTotalMinutesThisWeekBeDisplayed = appSelectors.statistics.shouldTotalMinutesThisWeekBeDisplayed(state);
    const shouldDailyStreakBeDisplayed = appSelectors.statistics.shouldDailyStreakBeDisplayed(state);

    return (
        <div>
            {shouldDailyStreakBeDisplayed && <p>{t("dailyStreak", {dailyStreak})}</p>}
            {shouldTotalMinutesThisWeekBeDisplayed && <p>
                {t("hourCount", hourCountThisWeek)}
                {t("minuteCount", minuteCountThisWeek)}
                {t("thisWeek")}
            </p>}
        </div>
    )
}