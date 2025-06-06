import "./style/style.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App.jsx";
import { StateManager } from "domain/src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import { addDebugger } from "./lib/debug.functions.js";
import { createEffects } from "./effects/effects.js";
import { resolveEffectsDependencies } from "./main.dependencies.js";

//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent);
const rootVM = stateManager.getRootVM();

//DEPENDENCIES
const dependencies = await resolveEffectsDependencies();

//EFFECTS
createEffects(rootVM, dependencies).forEach(stateManager.addEffect);

//DEBUG
addDebugger(stateManager);

//REACT APP
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App stateManager={stateManager} />
  </StrictMode>,
);

//notify that the app is ready
stateManager.getRootVM().dispatchers.appOpened();
