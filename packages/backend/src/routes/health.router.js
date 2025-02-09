import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get health');
    res.status(200).json({ status: 'UP' });
});

export default router;