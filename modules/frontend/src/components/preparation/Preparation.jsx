import { useTranslation } from "react-i18next";

function Preparation({ vm }) {
  const { t } = useTranslation();
  //actions
  const addTimeClicked = vm.dispatchers.moreTimeRequested;
  const skipClicked = vm.dispatchers.skipRequested;
  //selectors
  const preparationRemainingTime = vm.selectors.remainingTime();
  const timeIncrementInSeconds = vm.selectors.timeIncrementInSeconds();
  return (
    <div className="vstack">
      <label>{t("preparation")}</label>
      <div className="mt-time-display">{preparationRemainingTime}</div>
      <div className="d-flex flex-column fs-4">
        <button
          className="btn btn-outline-primary rounded"
          onClick={addTimeClicked}
        >
          +{timeIncrementInSeconds}s
        </button>
        <a onClick={skipClicked} className="link-primary" role="button">
          {t("skip")}
        </a>
      </div>
    </div>
  );
}

export default Preparation;
