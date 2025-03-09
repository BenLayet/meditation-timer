import {meditationSessionComponent} from "../meditation-session/meditation-session.component.js";
import {statisticsComponent} from "../statistics/statistics.component.js";
import {meditationSettingsComponent} from "../meditation-settings/meditation-settings.component.js";
import {meditationTimerAppChainedEvents} from "./meditation-timer-app.chained-events.js";
import {MEDITATION_TIMER_APP_INITIAL_STATE} from "./meditation-timer-app.state.js";
import {meditationTimerAppEventHandlers} from "./meditation-timer-app.reducers.js";


export const meditationTimerAppComponent = {
    initialState: MEDITATION_TIMER_APP_INITIAL_STATE,
    subComponents: {
        meditationSettings: meditationSettingsComponent,
        meditationSession: meditationSessionComponent,
        statistics: statisticsComponent,
    },
    chainedEvents: meditationTimerAppChainedEvents,
    eventHandlers: meditationTimerAppEventHandlers
};