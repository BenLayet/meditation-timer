import "./MeditationSettings.css";
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
    <div className="settings-table gap-3 gap-sm-0">
      <div className="row setting">
        <label className="col-sm-4">{t("duration")}</label>
        <div className="col-sm-8 row">
          <div className="col-4 ">
            <PlusMinusControl
              minusClicked={meditationRemoveTimeClicked}
              plusClicked={meditationAddTimeClicked}
            />
          </div>
          <span className="col-6 time-display">{meditationDuration}</span>
        </div>
      </div>
      <div className="row setting">
        <label className="col-sm-4">{t("preparation")}</label>
        <div className="col-sm-8 row">
          <div className="col-4">
            <PlusMinusControl
              minusClicked={preparationRemoveTimeClicked}
              plusClicked={preparationAddTimeClicked}
            />
          </div>
          <span className="col-6 time-display">{preparationDuration}</span>
        </div>
      </div>
      <div className="row setting">
        <label className="col-sm-4">{t("gong")}</label>
        <div className="col-sm-8 row">
          <div className="col-4 d-flex">
            <GongControl vm={vm} />
          </div>
          <div className={"col-8 subtle d-flex " + (isGongOff && "disabled")}>
            {t("test")}&nbsp;
            <FontAwesomeIcon
              icon={faPlay}
              className="round-button"
              onClick={gongPlayClicked}
            />
            &nbsp;
            <FontAwesomeIcon
              icon={faStop}
              className="round-button"
              onClick={gongStopClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeditationSettings;
