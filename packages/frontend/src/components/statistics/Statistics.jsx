import {useTranslation} from "react-i18next";
import "./Statistics.css";

export function Statistics({vm}) {
    const {t} = useTranslation();
    //selectors
    const dailyStreak = vm.selectors.dailyStreak();
    const hourCount = vm.selectors.hourCountThisWeek();
    const minuteCount = vm.selectors.minuteCountThisWeek();
    const shouldTotalMinutesThisWeekBeDisplayed = vm.selectors.shouldTotalMinutesThisWeekBeDisplayed();
    const shouldDailyStreakBeDisplayed = vm.selectors.shouldDailyStreakBeDisplayed();

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