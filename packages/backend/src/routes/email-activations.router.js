import express from "express";

export function emailActivationsRouter(emailActivationService) {

    const router = express.Router();

    // Route to send an activation email
    router.post('/', async (req, res, next) => {
        try {
            const { email } = req.body;
            console.log(`Send an activation email requested: ${JSON.stringify(email)}`);
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            const emailActivation = await emailActivationService.sendActivationEmail(email);
            res.status(200).json({ message: 'Activation email sent successfully' });
            console.log(`activation email send: ${emailActivation.token}`);
        } catch (error) {
            res.status(500).json({ error: 'Failed to send activation email' });
            console.log(`activation email error: ${error}`);
            next(error);
        }
    });

    // Route to activate an account
    router.get('/activate/:token', async (req, res, next) => {
        try {
            const { token } = req.params;
            await emailActivationService.activateAccount(token);
            res.status(200).json({ message: 'Account activated successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Invalid or expired activation token' });
            next(error);
        }
    });

    return router;
}
