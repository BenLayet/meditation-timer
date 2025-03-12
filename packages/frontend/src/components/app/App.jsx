import './App.css'
import '../../config/i18n';
import AppHeader from "./AppHeader.jsx";
import AppBody from "./AppBody.jsx";
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import {StateManager} from "domain/src/lib/state-manager/state-manager.js";
import {
    meditationTimerAppComponent
} from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import {useEffect, useState} from "react";

const dependencies = {wakeLockService, gongService, tickingService, meditationRepository};
//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent, dependencies);
const App = () => {
    const [vm, setVM] = useState(stateManager.getRootVM());
    useEffect(() => {
        stateManager.addRootVMChangedListener(setVM);
        return () => stateManager.cleanUp()
    }, []);

    return (<>
        <AppHeader vm={vm}/>
        <AppBody vm={vm}/>
    </>);
}
export default App;