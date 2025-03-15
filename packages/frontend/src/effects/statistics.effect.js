import {meditationRepository} from "../repositories/meditationRepository.js";

export const statisticsEffect = (events) => async () => {
    try {
        const statistics = await meditationRepository.fetchStatistics();
        events.fetchSucceeded({statistics});
    } catch (error) {
        console.error(error);
        events.fetchFailed({error});
    }
}