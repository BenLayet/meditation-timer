import "./NewMeditation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function NewMeditation({ vm }) {
  const { t } = useTranslation();
  //actions
  const meditationAddTimeClicked = () =>
    vm.dispatchers.moreMeditationTimeRequested();
  const meditationRemoveTimeClicked = () =>
    vm.dispatchers.lessMeditationTimeRequested();
  //selectors
  const meditationDuration = vm.selectors.meditationDuration();

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <div className="new-meditation-settings flex-column">
        <div className="new-meditation-setting flex-column">
          <label>{t("duration")}</label>
          <div className="new-meditation-setting-control flex-column">
            <span className="time-display">{meditationDuration}</span>
            <div className="round-button-group">
              <FontAwesomeIcon
                icon={faMinus}
                onClick={meditationRemoveTimeClicked}
                className="round-button"
              />
              <FontAwesomeIcon
                icon={faPlus}
                onClick={meditationAddTimeClicked}
                className="round-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMeditation;
