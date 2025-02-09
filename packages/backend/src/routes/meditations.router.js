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
    router.get('/daily-streak', async (req, res) => {
        console.log('Get daily-streak meditation');
        try {
            const deviceUuid = req.cookies['device_uuid'];
            const dailyStreak = await meditationRepository.getDailyStreak({deviceUuid});
            res.status(200).json({dailyStreak});
            console.log(`Get daily-streak meditation: ${dailyStreak}`);
        } catch (error) {
            res.status(500).json({error: error.message});
            console.error(error);
        }
    });
    return router;
}

