import "./style/style.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App.jsx";
import { StateManager } from "domain/src/lib/state-manager/state-manager.js";
import { meditationTimerAppComponent } from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import { addDebugger } from "./lib/debug.functions.js";
import { createEffects } from "./effects/effects.js";
import { MeditationService } from "./services/meditation.service.js";
import { LocalStore } from "./storage/local-store.js";
import { wakeLockService } from "./services/wake-lock.service.js";
import { gongService } from "./services/gong.service.js";
import { tickingService } from "./services/ticking.service.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import {
  meditationsIndexedDbSchema,
  MEDITATION_STORE_NAME,
} from "./storage/meditations.indexed-db.schema.js";
import { DeviceUuidService } from "./services/device-uuid.service.js";

//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent);
const rootVM = stateManager.getRootVM();

//DEPENDENCIES
const deviceUuidService = new DeviceUuidService();
const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
const meditationLocalStore = new LocalStore(indexedDb, MEDITATION_STORE_NAME);
const meditationService = new MeditationService(
  meditationLocalStore,
  deviceUuidService
);
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

//CHECK SUPPORTED FEATURES
console.log('Service Worker supported:', 'serviceWorker' in navigator);
console.log('Background Sync supported:', 'SyncManager' in window);
console.log('Wake Lock API supported:', 'wakeLock' in navigator);
console.log('IndexedDB supported:', 'indexedDB' in window);

//REACT APP
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App stateManager={stateManager} />
  </StrictMode>
);
