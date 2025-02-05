import { v4 as createUuid } from 'uuid';
import { datasource } from '../config/datasource.js';

class MeditationRepository {
    async createMeditation(meditation) {
        const { started, ended, deviceUuid } = meditation;
        const id = createUuid();
        const result = await datasource`
            INSERT INTO meditations (id, started, ended, device_uuid)
            VALUES (${id}, ${started}, ${ended}, ${deviceUuid})
                RETURNING *;
        `;
        return result[0];
    }

    async getAllMeditations(filter) {
        const {deviceUuid} = filter;
        return datasource`
            SELECT * FROM meditations WHERE device_uuid = ${deviceUuid};
        `;
    }

    async getDailyStreak(filter) {
        const {deviceUuid} = filter;
        const results = await datasource`
            SELECT * FROM (            
                SELECT distinct floor(extract(epoch from started) / 86400) as day 
                FROM meditations   
                WHERE device_uuid = ${deviceUuid} and ended is not null)
            ORDER BY day DESC;
        `;
        const allDays = results.map(result => result.day);
        let streak = 0;
        let lastDay = Math.floor(new Date()/ (86400 * 1000));
        for (let day of allDays) {
            if (lastDay && lastDay - day > 1) {
                break;
            }
            streak++;
            lastDay = day;
        }
        return streak;
    }
}

export default MeditationRepository;