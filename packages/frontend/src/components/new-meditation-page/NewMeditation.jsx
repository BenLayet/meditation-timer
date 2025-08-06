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
    <div className="d-flex flex-column align-items-center fs-1 mb-4">
      <label>{t("duration")}</label>
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
  );
}

export default NewMeditation;
