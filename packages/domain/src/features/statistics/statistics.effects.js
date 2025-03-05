import {statisticsFetchFailed, statisticsFetchRequested, statisticsFetchSucceeded} from "./statistics.events.js";

const fetchStatistics = meditationRepository =>
    async ({dispatch}) => {
        try {
            const statistics = await meditationRepository.fetchStatistics();
            dispatch(statisticsFetchSucceeded({statistics}));
        } catch (error) {
            console.error(error);
            dispatch(statisticsFetchFailed({error}));
        }
    }

export const statisticsEffects = ({meditationRepository}) => [
    {
        onEvent: statisticsFetchRequested,
        then: fetchStatistics(meditationRepository)
    }
];
