import './App.css'
import Settings from "../settings/Settings.jsx";
import '../../config/i18n';
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import {AppStateProvider} from "./AppStateProvider.jsx";


const App = () => <AppStateProvider>
        <div className="app-header">
            <Settings/>
        </div>
        <div className="app-body">
            <MeditationSessionPage/>
        </div>
    </AppStateProvider>
;
export default App;