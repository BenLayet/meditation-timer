import express from 'express';

export function meditationsRouter(meditationRepository) {

    const router = express.Router();

    // Create a new meditation
    router.post('', async (req, res) => {
        console.log(`creating meditation`);
        try {
            const meditation = req.body;
            meditation.deviceUuid = req.cookies['device_uuid'];
            const created = await meditationRepository.createMeditation(meditation);
            res.status(201).json(created);
            console.log(`Meditation created: ${created.id}`);
        } catch (error) {
            res.status(500).json({error: error.message});
            console.error(error);
        }
    });

    // Get all meditations from device
    router.get('/statistics', async (req, res) => {
        console.log('Get meditation statistics');
        try {
            const deviceUuid = req.cookies['device_uuid'];
            const epochDay = req.query.epochDay ?? Math.floor(new Date() / (86400 * 1000))
            const dailyStreak = await meditationRepository.getDailyStreak({deviceUuid}, epochDay);
            const totalMinutesThisWeek = await meditationRepository.totalMinutesOnWeekBefore({deviceUuid}, epochDay);
            const statistics = {dailyStreak, totalMinutesThisWeek};
            res.status(200).json(statistics);
            console.log(`Got meditation statistics: ${JSON.stringify(statistics)}`);
        } catch (error) {
            res.status(500).json({error: error.message});
            console.error(error);
        }
    });
    return router;
}

