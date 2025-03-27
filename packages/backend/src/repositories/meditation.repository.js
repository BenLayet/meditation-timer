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
        return {id:result[0].id, ...meditation};
    }

    async getDailyStreak(filter, epochDay) {

        const {deviceUuid} = filter;
        const results = await this.datasource`
            SELECT *
            FROM (SELECT distinct floor(extract(epoch from started) / 86400) as day
                  FROM meditations
                  WHERE device_uuid = ${deviceUuid}) as days
              WHERE day <= ${epochDay}
            ORDER BY day DESC;
        `;
        const allDays = results.map(result => result.day);
        let streak = 0;
        let lastDay = epochDay;
        for (let day of allDays) {
            if (lastDay && lastDay - day > 1) {
                break;
            }
            streak++;
            lastDay = day;
        }
        return streak;
    }

    async totalMinutesOnWeekBefore(filter, epochDay) {
        const {deviceUuid} = filter;
        // includes data for the current day
        const beforeTimeInMs = (epochDay+1) * 86400 * 1000;
        // 7 days before the current day
        const afterTimeInMs = (epochDay-7) * 86400 * 1000;
        const result = await this.datasource`
            SELECT sum(duration_in_minutes) as total
            FROM meditations
            WHERE
              device_uuid = ${deviceUuid}
              AND started <= ${beforeTimeInMs}
              AND started > ${afterTimeInMs};
        `;
        return (result.length > 0 && result[0].total) ? parseInt(result[0].total) : 0;
    }
}

export default MeditationRepository;