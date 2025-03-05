import "./MeditationSettings.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {useTranslation} from "react-i18next";
import GongControl from "../gong-control/GongControl.jsx";
import {
    lessMeditationTimeRequested,
    lessPreparationTimeRequested,
    moreMeditationTimeRequested,
    morePreparationTimeRequested
} from "domain/src/features/meditation-settings/meditation-settings.events.js";

function MeditationSettings() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const preparationAddTimeClicked = () => dispatch(morePreparationTimeRequested());
    const preparationRemoveTimeClicked = () => dispatch(lessPreparationTimeRequested());
    const meditationAddTimeClicked = () => dispatch(moreMeditationTimeRequested());
    const meditationRemoveTimeClicked = () => dispatch(lessMeditationTimeRequested());
    //selectors
    const nextPreparationDuration = appSelectors.nextPreparationDuration(state);
    const nextMeditationDuration = appSelectors.nextMeditationDuration(state);
    return <div className="flex-grow flex-column">
        <div className="meditation-settings flex-column">
            <div className="meditation-setting flex-column">
                <label>{t('duration')}</label>
                <div className="meditation-setting-control flex-column">
                    {nextMeditationDuration}
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
                    {nextPreparationDuration}
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
                    <GongControl/>
                </div>
            </div>
        </div>
    </div>;
}

export default MeditationSettings;