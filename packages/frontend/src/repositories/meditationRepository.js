import deviceUuidService from "../services/deviceUuidService.js";

class MeditationRepository {


    async saveMeditation(meditation) {
        deviceUuidService.initializeCookie();

        try {
            const response = await fetch('/api/v1/meditations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meditation)
            });
            console.log('Meditation posted:', response.status);
        } catch (error) {
            console.error('Error posting meditation:', error);
            throw error;
        }
    }
    async fetchStatistics() {
        deviceUuidService.initializeCookie();
        try {
            const response = await fetch('/api/v1/meditations/statistics');
            return await response.json();
        } catch (error) {
            console.error('Error fetching daily streak:', error);
            throw error;
        }
    }

}

export const meditationRepository = new MeditationRepository();