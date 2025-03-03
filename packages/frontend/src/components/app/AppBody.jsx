import {useContext} from "react";
import {AppStateContext} from "./AppStateProvider.jsx";
import {appSelectors} from "domain/src/app/meditation-timer.app.js";
import MeditationSettingsPage from "../meditation-settings-page/MeditationSettingsPage.jsx";
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import StatisticsPage from "../statistics/StatisticsPage.jsx";

const AppBody = () => {
    const {state} = useContext(AppStateContext);
    //selectors
    const page = appSelectors.currentPage(state);
    return (
        <div className="app-body">
            {page === 'HOME' && <MeditationSettingsPage/>}
            {page === 'MEDITATION_SESSION' && <MeditationSessionPage/>}
            {page === 'STATISTICS' && <StatisticsPage/>}
        </div>
    );
}
export default AppBody;