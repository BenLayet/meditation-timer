import express from 'express';
import MeditationRepository from "../repositories/meditation.repository.js";

const router = express.Router();
const meditationRepository = new MeditationRepository();

// Create a new meditation
router.post('', async (req, res) => {
    try {
        const meditation = req.body;
        meditation.deviceUuid = req.cookies['device_uuid'];
        const created = await meditationRepository.createMeditation(meditation);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Get all meditations from device
router.get('', async (req, res) => {
    try {
        const deviceUuid = req.cookies['device_uuid'];
        const meditations = await meditationRepository.getAllMeditations({deviceUuid});
        res.status(200).json(meditations);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default router;