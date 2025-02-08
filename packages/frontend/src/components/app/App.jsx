import './App.css'
import Settings from "../settings/Settings.jsx";
import Timer from "../timer/Timer.jsx";
import '../../config/i18n';


function App() {

  return (
    <>
        <div className="app-header">
            <Settings/>
        </div>
        <div className="app-body">
            <Timer />
        </div>
    </>
  )
}

export default App
