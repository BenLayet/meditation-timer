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
  const isStatisticsPresentationVisible =
    vm.selectors.isStatisticsPresentationVisible();

  return (
    <div>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          {isStatisticsPresentationVisible && (
            <p className="fs-5 text-muted">{t("statisticsPresentation")}</p>
          )}
          <ul className={"statistics " + (animated && "animated")}>
            <li className="statistics-item">
              {t("meditationCount", { count: meditationCount })}
            </li>
            {shouldTotalMinutesThisWeekBeDisplayed && (
              <li className={"statistics-item"}>
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
        </>
      )}
    </div>
  );
}
