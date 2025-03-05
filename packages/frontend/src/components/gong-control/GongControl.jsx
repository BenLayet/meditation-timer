import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import {gongToggled} from "domain/src/features/meditation-settings/meditation-settings.events.js";


function GongControl() {
    const {state, dispatch} = useContext(AppStateContext);
    //actions
    const gongToggleClicked = () => dispatch(gongToggled());
    //selectors
    const isGongOff = appSelectors.meditationSettings.isGongOff(state);
    return <FontAwesomeIcon
        icon={isGongOff ? faVolumeXmark : faVolumeHigh}
        className="round-button" onClick={gongToggleClicked}
    />;
}

export default GongControl;