import {meditationSessionFeature} from "../meditation-session/meditation-session.feature.js";
import {statisticsFeature} from "../statistics/statistics.feature.js";
import {meditationSettingsFeature} from "../meditation-settings/meditation-settings.feature.js";
import {navigationFeature} from "../navigation/navigation.feature.js";
import {meditationTimerAppChainedEvents} from "./meditation-timer-app.chained-events.js";


export const meditationTimerAppFeature = {
    subFeatures: {
        navigation: navigationFeature,
        meditationSettings: meditationSettingsFeature,
        meditationSession: meditationSessionFeature,
        statistics: statisticsFeature,
    },
    chainedEvents: meditationTimerAppChainedEvents
};