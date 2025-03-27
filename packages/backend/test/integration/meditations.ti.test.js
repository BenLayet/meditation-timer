import { MEDITATIONS_API_URL} from "./ti-config.js";
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fetch from 'node-fetch';
import {datasource} from "../../src/config/datasource.js";

const CURRENT_TIME_IN_SECONDS = 1742997126;
const CURRENT_EPOCH_DAY = Math.floor(CURRENT_TIME_IN_SECONDS / 86400);
const MEDITATION_DURATION_IN_MINUTES = 20;
const DEVICE_UUID = '00000000-0000-0000-0000-000000000001';

async function saveMeditation(meditation) {
    const response = await fetch(MEDITATIONS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie':  `device_uuid=${DEVICE_UUID}`
        },
        body: JSON.stringify(meditation)
    });
    return response;
}

async function getMeditationStatistics(epochDay) {
    const response = await fetch(`${MEDITATIONS_API_URL}/statistics?epochDay=${epochDay}`, {
        method: 'GET',
        headers: {
            'Cookie':  `device_uuid=${DEVICE_UUID}`
        }
    });
    return response;
}
describe('Meditation API Integration Tests', () => {
    beforeEach(async () => {
        await datasource`DELETE FROM meditations;`;
    });
    
    afterAll(async () => {
        await datasource`DELETE FROM meditations;`;
    });

    it('should get empty meditation statistics', async () => {
        const response = await getMeditationStatistics(CURRENT_EPOCH_DAY);
        const statistics = await response.json();
        expect(statistics).toHaveProperty('totalMinutesThisWeek', 0);
        expect(statistics).toHaveProperty('dailyStreak', 0);
    });

    it('should create a meditation session', async () => {
        
        //GIVEN
        const meditation = {
            startedTimeInSeconds: CURRENT_TIME_IN_SECONDS,
            durationInMinutes: MEDITATION_DURATION_IN_MINUTES
        };
        //WHEN
        const response = await saveMeditation(meditation);

        //THEN
        expect(response.status).toBe(201);
        const saved = await response.json();
        expect(saved).toHaveProperty('id');
        expect(saved).toHaveProperty('startedTimeInSeconds', CURRENT_TIME_IN_SECONDS);
        expect(saved).toHaveProperty('durationInMinutes', MEDITATION_DURATION_IN_MINUTES);

    });

    
    it('should update stats', async () => {
        
        //GIVEN
        const meditation = {
            startedTimeInSeconds: CURRENT_TIME_IN_SECONDS,
            durationInMinutes: MEDITATION_DURATION_IN_MINUTES
        };
        //WHEN
        await saveMeditation(meditation);
        const response =  await getMeditationStatistics(CURRENT_EPOCH_DAY);
        //THEN
        const statistics = await response.json();
        expect(statistics).toHaveProperty('totalMinutesThisWeek', 20);
        expect(statistics).toHaveProperty('dailyStreak', 1);
    });
});
