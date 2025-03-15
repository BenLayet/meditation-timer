import {v4 as createUuid} from 'uuid';

class MeditationRepository {

    constructor(datasource) {
        this.datasource = datasource;
    }

    async createMeditation(meditation) {
        const {startedTimeInSeconds, durationInMinutes, deviceUuid} = meditation;
        const id = createUuid();
        const started = startedTimeInSeconds * 1000;
        const result = await this.datasource`
            INSERT INTO meditations (id, started, duration_in_minutes, device_uuid)
            VALUES (${id}, ${started}, ${durationInMinutes}, ${deviceUuid})
            RETURNING *;
        `;
        return result[0];
    }

    async getDailyStreak(filter) {

        const {deviceUuid} = filter;
        const results = await this.datasource`
            SELECT *
            FROM (SELECT distinct floor(extract(epoch from started) / 86400) as day
                  FROM meditations
                  WHERE device_uuid = ${deviceUuid}) as days
            ORDER BY day DESC;
        `;
        const allDays = results.map(result => result.day);
        let streak = 0;
        let lastDay = Math.floor(new Date() / (86400 * 1000));
        for (let day of allDays) {
            if (lastDay && lastDay - day > 1) {
                break;
            }
            streak++;
            lastDay = day;
        }
        return streak;
    }

    async totalMinutesThisWeek(filter) {
        const {deviceUuid} = filter;
        const result = await this.datasource`
            SELECT sum(duration_in_minutes) as total
            from meditations
            WHERE device_uuid = ${deviceUuid}
              and started > now() - interval '7 days';
        `;
        return (result.length > 0 && result[0].total) ? parseInt(result[0].total) : 0;
    }
}

export default MeditationRepository;