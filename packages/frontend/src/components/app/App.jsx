import './App.css'
import Settings from "../settings/Settings.jsx";
import Timer from "../timer/Timer.jsx";
import '../../config/i18n';
import {AppStateProvider} from "./GlobalStateContext.jsx";


function App() {

  return (
      <AppStateProvider>
        <div className="app-header">
            <Settings/>
        </div>
        <div className="app-body">
            <Timer />
        </div>
    </AppStateProvider>
  )
}

export default App
