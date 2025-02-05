import deviceUuidService from "../services/deviceUuidService.js";

class MeditationRepository {


    async postMeditation(timerState) {
        deviceUuidService.initializeCookie();
        const meditation = {
            started: timerState.startedTimestampMs,
            ended: timerState.lastTickTimestampMs
        };

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
        }
    }
    async fetchDailyStreak() {
        deviceUuidService.initializeCookie();
        try {
            const response = await fetch('/api/v1/meditations/daily-streak'); // Replace with your API endpoint
            const data = await response.json();
            return data.dailyStreak; // Assuming the endpoint returns { dailyStreak: <number> }
        } catch (error) {
            console.error('Error fetching daily streak:', error);
        }
    }

}

export const meditationRepository = new MeditationRepository();