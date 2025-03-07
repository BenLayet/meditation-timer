import {useContext} from "react";
import {AppStateContext} from "./AppStateProvider.jsx";
import {appSelectors} from "domain/src/features/meditation-timer-app/meditation-timer-app.selectors.js";
import MeditationSettingsPage from "../meditation-settings-page/MeditationSettingsPage.jsx";
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import StatisticsPage from "../statistics/StatisticsPage.jsx";

const AppBody = () => {
    const {state} = useContext(AppStateContext);
    //selectors
    const page = appSelectors.currentPage(state);
    const meditationSettingsState = appSelectors.meditationSettingsState(state);
    const meditationSessionState = appSelectors.meditationSessionState(state);
    const statisticsState = appSelectors.statisticsState(state);
    return (
        <div className="app-body">
            {page === 'HOME' && <MeditationSettingsPage meditationSettingsState={meditationSettingsState}/>}
            {page === 'MEDITATION_SESSION' && <MeditationSessionPage meditationSessionState={meditationSessionState}/>}
            {page === 'STATISTICS' && <StatisticsPage statisticsState={statisticsState}/>}
        </div>
    );
}
export default AppBody;