import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './edges.css';
import './colors.css';
import './typography.css';
import './button.css';
import './range.css';
import './animation.css';
import './layout.css';
import './index.css';
import App from './components/app/App.jsx'
import {StateManager} from "domain/src/lib/state-manager/state-manager.js";
import {
    meditationTimerAppComponent
} from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import {addDebugger} from "./lib/debug.functions.js";
import {registerEffects} from "./effects/register-effects.js";

const stateManager = new StateManager(meditationTimerAppComponent);

registerEffects(stateManager);

//DEBUG
addDebugger(stateManager);

createRoot(document.getElementById('root')).render(<StrictMode>
    <App stateManager={stateManager}/>
</StrictMode>,)