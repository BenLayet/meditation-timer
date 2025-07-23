import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function GongControl({ vm }) {
  const { t } = useTranslation();
  //actions
  const gongToggleClicked = () => vm.dispatchers.gongToggled();
  //selectors
  const isGongOff = vm.selectors.isGongOff();
  return (
    <div className="clickable d-flex" onClick={gongToggleClicked}>
      {isGongOff ? t("off") : t("on")}&nbsp;
      <FontAwesomeIcon
        icon={isGongOff ? faVolumeXmark : faVolumeHigh}
        className="round-button"
      />
    </div>
  );
}

export default GongControl;
