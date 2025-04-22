export class MeditationService {
  constructor(meditationLocalStore, deviceUuidService) {
    this.meditationLocalStore = meditationLocalStore;
    this.deviceUuidService = deviceUuidService;
  }
  async saveMeditation(meditation) {
    // Ajouter l'UUID de l'appareil à la méditation
    meditation.deviceUuid = this.deviceUuidService.getDeviceUuid();

    await this.meditationLocalStore.add(meditation);
    // Enregistrer la tâche de synchronisation si le service worker est prêt
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("sync-meditations").catch((err) => {
          console.error("Failed to register sync-meditations:", err);
        });
      });
    } else {
      console.warn("Background Sync is not supported in this browser.");
    }
  }
  async getAllMeditations() {
    return this.meditationLocalStore.getAll();
  }
}

