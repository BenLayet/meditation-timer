import { useTranslation } from "react-i18next";
import Timer from "../timer/Timer.jsx";
import "./Preparation.css";

function Preparation({ vm }) {
  const { t } = useTranslation();
  //actions
  const addTimeClicked = vm.dispatchers.moreTimeRequested;
  const skipClicked = vm.dispatchers.skipRequested;
  //selectors
  const preparationRemainingTime = vm.selectors.remainingTime();
  const timeIncrementInSeconds = vm.selectors.timeIncrementInSeconds();
  return (
    <>
      <label>{t("preparation")}</label>
      <Timer displayedTime={preparationRemainingTime} />
      <div className="d-flex flex-column fs-4">
        <button className="round-rectangle-button" onClick={addTimeClicked}>
          +{timeIncrementInSeconds}s
        </button>
        <a onClick={skipClicked} className="clickable">
          {t("skip")}
        </a>
      </div>
    </>
  );
}

export default Preparation;
