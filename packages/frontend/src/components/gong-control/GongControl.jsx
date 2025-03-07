import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";
import {gongToggled} from "domain/src/features/meditation-settings/meditation-settings.events.js";


function GongControl({isGongOff}) {
    const {dispatch} = useContext(AppStateContext);
    //actions
    const gongToggleClicked = () => dispatch(gongToggled());
    return <FontAwesomeIcon
        icon={isGongOff ? faVolumeXmark : faVolumeHigh}
        className="round-button" onClick={gongToggleClicked}
    />;
}

export default GongControl;