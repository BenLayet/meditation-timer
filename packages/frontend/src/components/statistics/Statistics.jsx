import { useTranslation } from "react-i18next";
import "./Statistics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function Statistics({ vm, animated = false }) {
  const { t } = useTranslation();
  //selectors
  const dailyStreak = vm.selectors.dailyStreak();
  const hourCount = vm.selectors.hourCountThisWeek();
  const minuteCount = vm.selectors.minuteCountThisWeek();
  const shouldTotalMinutesThisWeekBeDisplayed =
    vm.selectors.shouldTotalMinutesThisWeekBeDisplayed();
  const shouldDailyStreakBeDisplayed =
    vm.selectors.shouldDailyStreakBeDisplayed();
  const meditationCount = vm.selectors.meditationCount();
  const isLoading = vm.selectors.isLoading();

  return (
    <div>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <ul className="statistics">
          <li className="statistics-item">
            {t("meditationCount", { count: meditationCount })}
          </li>
          {shouldTotalMinutesThisWeekBeDisplayed && (
            <li className={"statistics-item " + (animated && "animated")}>
              {t("hourCount", hourCount)}
              {t("minuteCount", minuteCount)}
              {t("thisWeek")}
            </li>
          )}
          {shouldDailyStreakBeDisplayed && (
            <li className="statistics-item">
              {t("dailyStreak", { dailyStreak })}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
