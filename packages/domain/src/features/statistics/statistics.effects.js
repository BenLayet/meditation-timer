import {statisticsEvents} from "./statistics.events.js";

const fetchStatistics = meditationRepository =>
    async ({dispatch}) => {
        try {
            const statistics = await meditationRepository.fetchStatistics();
            dispatch(statisticsEvents.fetchSucceeded, {statistics});
        } catch (error) {
            console.error(error);
            dispatch(statisticsEvents.fetchFailed, {error});
        }
    }

export const statisticsEffects = ({meditationRepository}) => [
    {
        onEvent: statisticsEvents.fetchRequested,
        then: fetchStatistics(meditationRepository)
    }
];
