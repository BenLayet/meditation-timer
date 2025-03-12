import {isEqual} from "lodash-es";
import {meditationRepository} from "../repositories/meditationRepository.js";

export const saveMeditationEffect = (events) => async (newState, event) => {
    if (event.eventType === "saveRequested" && isEqual(event.componentPath, ["meditationSession", "actualMeditation"])) {
        try {
            await meditationRepository
                .saveMeditation(event.payload.meditationToSave);
            events.saveSucceeded();
        } catch (error) {
            console.error(error);
            events.saveFailed({error});
        }
    }
}