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
import {saveMeditationEffect} from "./effects/save-meditation.effect.js";
import {statisticsEffect} from "./effects/statistics.effect.js";
import {tickingEffect} from "./effects/ticking.effect.js";
import {addDebugger} from "./lib/debug.functions.js";

const stateManager = new StateManager(meditationTimerAppComponent);
const rootVM = stateManager.getRootVM();

const actualMeditationEvents = rootVM.children.meditationSession.children.actualMeditation.events;
stateManager.addStateChangedListener(saveMeditationEffect(actualMeditationEvents));
stateManager.addStateChangedListener(tickingEffect(actualMeditationEvents, "actualMeditation"));

const preparationEvents = rootVM.children.meditationSession.children.preparation.events;
stateManager.addStateChangedListener(tickingEffect(preparationEvents, "preparation"));


const statisticsEvents = rootVM.children.statistics.events;
stateManager.addStateChangedListener(statisticsEffect(statisticsEvents));

//DEBUG
addDebugger(stateManager);

createRoot(document.getElementById('root')).render(<StrictMode>
    <App stateManager={stateManager}/>
</StrictMode>,)