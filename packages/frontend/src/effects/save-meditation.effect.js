import {meditationRepository} from "../repositories/meditationRepository.js";

export const saveMeditationEffect = (events) => async (event) => {
    try {
        await meditationRepository.saveMeditation(event.payload);
        events.saveSucceeded();
    } catch (error) {
        console.error(error);
        events.saveFailed({error});
    }
}