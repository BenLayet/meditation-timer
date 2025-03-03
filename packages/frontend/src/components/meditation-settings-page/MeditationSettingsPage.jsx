import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {meditationSessionStartRequested} from "domain/src/components/meditation-session/meditation-session.events.js";
import {currentTimeInSeconds} from "../../lib/time.functions.js";
import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import MeditationSettings from "./MeditationSettings.jsx";

function MeditationSettingsPage() {
    const {dispatch} = useContext(AppStateContext);
    const playClicked = () => dispatch(meditationSessionStartRequested(currentTimeInSeconds()));
    return <>
        <MeditationSettings/>
        <button className="main-action" onClick={playClicked}>
            <FontAwesomeIcon icon={faPlay}/>
        </button>
    </>;
}

export default MeditationSettingsPage;