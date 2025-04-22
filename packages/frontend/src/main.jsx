import "./style/style.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App.jsx";
import { StateManager } from "domain/src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import { addDebugger } from "./lib/debug.functions.js";
import { createEffects } from "./effects/effects.js";
import { MeditationService } from "./services/meditation.service.js";
import { LocalStorage } from "./storage/localStorage.js";
import { wakeLockService } from "./services/wakeLock.service.js";
import { gongService } from "./services/gong.service.js";
import { tickingService } from "./services/ticking.service.js";

//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent);
const rootVM = stateManager.getRootVM();

//DEPENDENCIES
const meditationLocalStorage = new LocalStorage("meditations");
const meditationService = new MeditationService(meditationLocalStorage);
const dependencies = {
  meditationService,
  gongService,
  wakeLockService,
  tickingService,
};

//EFFECTS
createEffects(rootVM, dependencies).forEach(stateManager.addEffect);

//DEBUG
addDebugger(stateManager);

//REACT APP
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App stateManager={stateManager} />
  </StrictMode>
);
