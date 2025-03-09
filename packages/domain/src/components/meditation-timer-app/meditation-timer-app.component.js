import {meditationSessionComponent} from "../meditation-session/meditation-session.component.js";
import {statisticsComponent} from "../statistics/statistics.component.js";
import {meditationSettingsComponent} from "../meditation-settings/meditation-settings.component.js";
import {navigationComponent} from "../navigation/navigation.component.js";
import {meditationTimerAppChainedEvents} from "./meditation-timer-app.chained-events.js";


export const meditationTimerAppComponent = {
    subComponents: {
        navigation: navigationComponent,
        meditationSettings: meditationSettingsComponent,
        meditationSession: meditationSessionComponent,
        statistics: statisticsComponent,
    },
    chainedEvents: meditationTimerAppChainedEvents
};