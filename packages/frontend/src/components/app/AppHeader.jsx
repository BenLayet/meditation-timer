import {useContext} from "react";
import {AppStateContext} from "./AppStateProvider.jsx";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import Settings from "../settings/Settings.jsx";

const AppHeader = () => {
    const {state} = useContext(AppStateContext);
    const canSettingsBeOpened = appSelectors.canSettingsBeOpened(state);
    return (
        <div className="app-header">
            <span className={" fadeIn " + (canSettingsBeOpened ? 'visible' : 'hidden')}>
                <Settings/>
            </span>
        </div>
    );
}
export default AppHeader;