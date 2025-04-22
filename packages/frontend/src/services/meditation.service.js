export class MeditationService {
  constructor(meditationLocalStore, deviceUuidService) {
    this.meditationLocalStore = meditationLocalStore;
    this.deviceUuidService = deviceUuidService;
  }
  async saveMeditation(meditation) {
    // Add the device UUID to the meditation
    meditation.deviceUuid = this.deviceUuidService.getDeviceUuid();

    await this.meditationLocalStore.add(meditation);
    // Register the sync task if the service worker is ready
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

