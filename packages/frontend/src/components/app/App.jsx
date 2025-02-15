import './App.css'
import Settings from "../settings/Settings.jsx";
import '../../config/i18n';
import {AppStateProvider} from "../global-state/GlobalStateContext.jsx";
import MeditationPage from "../meditation-page/MeditationPage.jsx";


function App() {

  return (
      <AppStateProvider>
        <div className="app-header">
            <Settings/>
        </div>
        <div className="app-body">
            <MeditationPage />
        </div>
    </AppStateProvider>
  )
}

export default App
