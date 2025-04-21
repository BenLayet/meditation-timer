import "./MeditationSettings.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import GongControl from "../gong-control/GongControl.jsx";

function MeditationSettings({vm}) {
    const {t} = useTranslation();
    //actions
    const preparationAddTimeClicked = () => vm.events.morePreparationTimeRequested();
    const preparationRemoveTimeClicked = () => vm.events.lessPreparationTimeRequested();
    const meditationAddTimeClicked = () => vm.events.moreMeditationTimeRequested();
    const meditationRemoveTimeClicked = () => vm.events.lessMeditationTimeRequested();
    //selectors
    const meditationDuration = vm.selectors.meditationDuration();
    const preparationDuration = vm.selectors.preparationDuration();

    return <div className="flex-grow flex-column">
        <div className="meditation-settings flex-column">
            <div className="meditation-setting flex-column">
                <label>{t('duration')}</label>
                <div className="meditation-setting-control flex-column">
                    <span className="time-display">{meditationDuration}</span>
                    <div className="round-button-group">
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={meditationRemoveTimeClicked}
                            className="round-button"/>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={meditationAddTimeClicked}
                            className="round-button"/>
                    </div>
                </div>
            </div>
            <div className="meditation-setting flex-column">
                <label>{t("preparation")}</label>
                    <div className="meditation-setting-control flex-column">
                    <span className="time-display">{preparationDuration}</span>
                    <div className="round-button-group">
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={preparationRemoveTimeClicked}
                            className="round-button"/>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={preparationAddTimeClicked}
                            className="round-button"/>
                    </div>
                </div>
            </div>
            <div className="meditation-setting flex-column">
                <label>{t("gong")}</label>
                <div className="meditation-setting-control flex-column bigger">
                    <GongControl vm={vm}/>
                </div>
            </div>
        </div>
    </div>;
}

export default MeditationSettings;