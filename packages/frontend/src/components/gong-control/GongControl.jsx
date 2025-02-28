import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import {gongToggled} from "domain/src/components/settings/settings.events.js";
import "./GongControl.css";
import {useTranslation} from "react-i18next";

function GongControl() {
    const {t} = useTranslation();
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const gongToggleClicked = () => dispatch(gongToggled());
    //selectors
    const isGongOff = appSelectors.settings.isGongOff(state);
    return <div className="gong-toggle clickable"
                onClick={gongToggleClicked}>
        {t("gong")}&nbsp;<FontAwesomeIcon icon={isGongOff ? faVolumeXmark : faVolumeHigh}/>
    </div>
        ;
}

export default GongControl;