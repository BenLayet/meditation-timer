import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import GongControl from "../gong-control/GongControl.jsx";
import { PlusMinusControl } from "../plus-minus-control/PlusMinusControl.jsx";

function MeditationSettings({ vm }) {
  const { t } = useTranslation();
  //actions
  const preparationAddTimeClicked = () =>
    vm.dispatchers.morePreparationTimeRequested();
  const preparationRemoveTimeClicked = () =>
    vm.dispatchers.lessPreparationTimeRequested();
  const meditationAddTimeClicked = () =>
    vm.dispatchers.moreMeditationTimeRequested();
  const meditationRemoveTimeClicked = () =>
    vm.dispatchers.lessMeditationTimeRequested();
  const gongStopClicked = () => vm.dispatchers.gongStopRequested();
  const gongPlayClicked = () => vm.dispatchers.gongPlayRequested();
  //selectors
  const meditationDuration = vm.selectors.meditationDuration();
  const preparationDuration = vm.selectors.preparationDuration();
  //selectors
  const isGongOff = vm.selectors.isGongOff();

  return (
    <div className="d-flex flex-column gap-3 gap-sm-0 text-start">
      <div className="row align-items-center">
        <label className="col-sm-5">{t("duration")}</label>
        <div className="col-sm-7 row align-items-center">
          <div className="col-4 col-sm-6  fs-3">
            <PlusMinusControl
              minusClicked={meditationRemoveTimeClicked}
              plusClicked={meditationAddTimeClicked}
            />
          </div>
          <div className="col-4 col-sm-6 mt-time-display">
            {meditationDuration}
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <label className="col-sm-5">{t("preparation")}</label>
        <div className="col-sm-7 row align-items-center">
          <div className="col-4 col-sm-6 fs-3">
            <PlusMinusControl
              minusClicked={preparationRemoveTimeClicked}
              plusClicked={preparationAddTimeClicked}
            />
          </div>
          <div className="col-4 col-sm-6 mt-time-display">
            {preparationDuration}
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <label className="col-sm-5">{t("gong")}</label>
        <div className="col-sm-7 row align-items-center">
          <div className="col-4 col-sm-6">
            <GongControl vm={vm} />
          </div>
          <div
            className={
              "col-4 col-sm-6 opacity-75 fs-4 align-items-center d-flex flex-nowrap" +
              (isGongOff ? "disabled" : "")
            }
          >
            {t("test")}&nbsp;
            <button className="btn round-button" onClick={gongPlayClicked}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            &nbsp;
            <button className="btn round-button" onClick={gongStopClicked}>
              <FontAwesomeIcon icon={faStop} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeditationSettings;
