import { meditationSessionComponent } from "../meditation-session/meditation-session.component.js";
import { statisticsComponent } from "../statistics/statistics.component.js";
import { meditationSettingsComponent } from "../meditation-settings/meditation-settings.component.js";
import { meditationTimerAppChainedEvents } from "./meditation-timer-app.chained-events.js";
import { MEDITATION_TIMER_APP_INITIAL_STATE } from "./meditation-timer-app.state.js";
import { meditationTimerAppSelectors } from "./meditation-timer-app.selectors.js";
import { meditationTimerAppEvents } from "./meditation-timer-app.events.js";
import { accountComponent } from "../account/account.component.js";
import { newMeditationComponent } from "../new-meditation/new-meditation.component.js";

export const meditationTimerAppComponent = {
  initialState: MEDITATION_TIMER_APP_INITIAL_STATE,
  children: {
    meditationSettings: meditationSettingsComponent,
    newMeditation: newMeditationComponent,
    meditationSession: meditationSessionComponent,
    statistics: statisticsComponent,
    account: accountComponent,
  },
  chainedEvents: meditationTimerAppChainedEvents,
  selectors: meditationTimerAppSelectors,
  events: meditationTimerAppEvents,
};
