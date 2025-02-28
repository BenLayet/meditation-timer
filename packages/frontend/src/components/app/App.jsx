import './App.css'
import Settings from "../settings/Settings.jsx";
import '../../config/i18n';
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import {AppStateContext, AppStateProvider} from "./AppStateProvider.jsx";
import {appSelectors} from "domain/src/meditation-timer.app.js";
import {useContext} from "react";
import GongControl from "../gong-control/GongControl.jsx";

const AppHeader = () => {
    const {state} = useContext(AppStateContext);
    //selectors
    const canSettingsBeOpened = appSelectors.canSettingsBeOpened(state);
    return (
        <div className="app-header">
            <span className={" fadeIn " + (canSettingsBeOpened ? 'visible' : 'hidden')}>
                <Settings/>
            </span>
        </div>
    );
}
const AppFooter = () => {
    return (
        <div className="app-footer">
            <GongControl/>
        </div>
    );
}
const AppBody = () => <div className="app-body"><MeditationSessionPage/></div>;

const App = () => {
    return (
        <AppStateProvider>
            <AppHeader/>
            <AppBody/>
            <AppFooter/>
        </AppStateProvider>
    );
}
export default App;