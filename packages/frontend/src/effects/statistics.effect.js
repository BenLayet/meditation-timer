import {isEqual} from "lodash-es";
import {meditationRepository} from "../repositories/meditationRepository.js";

export const statisticsEffect = (events) => async (newState, event) => {
    if (event.eventType === "fetchRequested" && isEqual(event.componentPath, ["statistics"])) {
        try {
            const statistics = await meditationRepository.fetchStatistics();
            events.fetchSucceeded({statistics});
        } catch (error) {
            console.error(error);
            events.fetchFailed({error});
        }
    }
}