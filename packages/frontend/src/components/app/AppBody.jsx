import MeditationSettingsPage from "../meditation-settings-page/MeditationSettingsPage.jsx";
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";

export default ({vm}) => {
    //selectors
    const page = vm.selectors.currentPage();
    return (
        <div className="app-body">
            {page === 'HOME' &&
                <MeditationSettingsPage vm={vm.children.meditationSettings}/>}
            {page === 'MEDITATION_SESSION' &&
                <MeditationSessionPage vm={vm.children.meditationSession}/>}
        </div>
    );
}