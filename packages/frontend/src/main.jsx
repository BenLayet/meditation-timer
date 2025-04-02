import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './style/edges.css';
import './style/colors.css';
import './style/typography.css';
import './style/button.css';
import './style/range.css';
import './style/animation.css';
import './style/layout.css';
import './style/index.css';
import App from './components/app/App.jsx'
import {StateManager} from "domain/src/lib/state-manager/state-manager.js";
import {
    meditationTimerAppComponent
} from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import {addDebugger} from "./lib/debug.functions.js";
import {registerEffects} from "./effects/registerEffects.js";

const stateManager = new StateManager(meditationTimerAppComponent);

registerEffects(stateManager);

//DEBUG
addDebugger(stateManager);

createRoot(document.getElementById('root')).render(<StrictMode>
    <App stateManager={stateManager}/>
</StrictMode>,)