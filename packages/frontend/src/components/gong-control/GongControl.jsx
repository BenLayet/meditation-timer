import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";


function GongControl({vm}) {
    //actions
    const gongToggleClicked = () => vm.dispatchers.gongToggled();
    //selectors
    const isGongOff = vm.selectors.isGongOff();
    return <FontAwesomeIcon
        icon={isGongOff ? faVolumeXmark : faVolumeHigh}
        className="round-button" onClick={gongToggleClicked}
    />;
}

export default GongControl;