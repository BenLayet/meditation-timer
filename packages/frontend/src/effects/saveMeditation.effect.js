import {meditationStorage} from "../storage/meditation.local.storage.js";

export const saveMeditationEffect = (events) => async (event) => {
    try {
        await meditationStorage.saveMeditation(event.payload);
        events.saveSucceeded();
    } catch (error) {
        console.error(error);
        events.saveFailed({error});
    }
}