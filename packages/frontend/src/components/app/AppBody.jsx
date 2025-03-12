import MeditationSettingsPage from "../meditation-settings-page/MeditationSettingsPage.jsx";

export default ({vm}) => {
    //selectors
    const page = vm.selectors.currentPage();
    return (
        <div className="app-body">
            {page === 'HOME' &&
                <MeditationSettingsPage vm={vm.children.meditationSettings}/>}
        </div>
    );
}