import { meditationRepository } from './meditation.remote.storage.js';

class SyncService {
    constructor() {
        window.addEventListener('online', this.uploadPendingMeditations.bind(this));
    }

    async uploadPendingMeditations() {
        if (navigator.onLine) {
            const pendingMeditations = localMeditationService.getPendingMeditations();
            for (const meditation of pendingMeditations) {
                try {
                    await meditationRepository.saveMeditation(meditation);
                } catch (error) {
                    console.error('Error uploading meditation:', error);
                    return;
                }
            }
            localMeditationService.clearPendingMeditations();
        }
    }
}

export const syncService = new SyncService();