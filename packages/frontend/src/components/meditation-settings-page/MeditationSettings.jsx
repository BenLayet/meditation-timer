import "./MeditationSettings.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {useTranslation} from "react-i18next";
import GongControl from "../gong-control/GongControl.jsx";
import {
    lessMeditationTimeRequested,
    lessPreparationTimeRequested,
    moreMeditationTimeRequested,
    morePreparationTimeRequested
} from "domain/src/features/meditation-settings/meditation-settings.events.js";
import {
    isGongOff,
    meditationDuration,
    preparationDuration
} from "domain/src/features/meditation-settings/meditation-settings.selectors.js";

function MeditationSettings({meditationSettingsState}) {
    const {t} = useTranslation();
    const {dispatch} = useContext(AppStateContext);
    //actions
    const preparationAddTimeClicked = () => dispatch(morePreparationTimeRequested());
    const preparationRemoveTimeClicked = () => dispatch(lessPreparationTimeRequested());
    const meditationAddTimeClicked = () => dispatch(moreMeditationTimeRequested());
    const meditationRemoveTimeClicked = () => dispatch(lessMeditationTimeRequested());
    return <div className="flex-grow flex-column">
        <div className="meditation-settings flex-column">
            <div className="meditation-setting flex-column">
                <label>{t('duration')}</label>
                <div className="meditation-setting-control flex-column">
                    {meditationDuration(meditationSettingsState)}
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
                    {preparationDuration(meditationSettingsState)}
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
                    <GongControl isGongOff={isGongOff(meditationSettingsState)}/>
                </div>
            </div>
        </div>
    </div>;
}

export default MeditationSettings;