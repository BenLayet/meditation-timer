import {meditationStorage} from "../storage/meditation.local.storage.js";

export const loadMeditations = (events) => async () => {
    try {
        const meditations = await meditationStorage.getAllMeditations();
        const currentEpochDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        events.meditationHistoryRetrieved({meditations, currentEpochDay});
    } catch (error) {
        console.error(error);
        events.meditationHistoryFailed({error});
    }
}