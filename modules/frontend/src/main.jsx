import "./style/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppShell from "./components/app/AppShell.jsx";
import { StateManager } from "@softersoftware/state-manager/state-manager";
import { meditationTimerAppComponent } from "@meditation-timer/domain/src/features/meditation-timer-app/meditation-timer-app.component.js";
import { addDebugger } from "./lib/debug.functions.js";
import { createEffects } from "./effects/effects.js";
import "./config/i18n.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { resolve } from "@softersoftware/functions/resolve.functions";
import { mainProviders } from "./main.providers.js";

//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent);
const rootVM = stateManager.getRootVM();

//DEPENDENCIES
const dependencies = await resolve(mainProviders);

//EFFECTS
createEffects(rootVM, dependencies).forEach(stateManager.addEffect);

//DEBUG
addDebugger(stateManager);

//REACT APP
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppShell stateManager={stateManager} />
  </StrictMode>,
);

//notify that the app is ready
stateManager.getRootVM().dispatchers.appOpened();
