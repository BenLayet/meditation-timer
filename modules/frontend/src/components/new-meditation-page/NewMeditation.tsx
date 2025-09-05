import { useTranslation } from "react-i18next";
import { PlusMinusControl } from "../plus-minus-control/PlusMinusControl.jsx";

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
    <div className="vstack align-items-center fs-1 mb-4">
      <label>{t("duration")}</label>
      <span className="mt-time-display">{meditationDuration}</span>
      <PlusMinusControl
        plusClicked={meditationAddTimeClicked}
        minusClicked={meditationRemoveTimeClicked}
      />
    </div>
  );
}

export default NewMeditation;
