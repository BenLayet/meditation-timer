export class MeditationService {
  constructor(meditationLocalStorage) {
    this.meditationLocalStorage = meditationLocalStorage;
  }
  async saveMeditation(meditation) {
    await this.meditationLocalStorage.saveMeditation(meditation);
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
    return this.meditationLocalStorage.getAllMeditations();
  }
}

