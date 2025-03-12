import {StateManager} from "../../../src/lib/state-manager/state-manager.js";
import {
    meditationTimerAppComponent
} from "../../../src/components/meditation-timer-app/meditation-timer-app.component.js";
import {logEvent} from "../../../src/lib/logger/logger.js";
import {statePatcher} from "../../../src/lib/state-manager/debugger.js";
import {statisticsEvents} from "../../../src/components/statistics/statistics.events.js";
import {isEqual} from "lodash-es";
import {actualMeditationEvents} from "../../../src/components/actual-meditation/actual-meditation.events.js";

//STATE MANAGER
export const stateManager = new StateManager(meditationTimerAppComponent);
stateManager.addStateChangedListener((newState, event) => events.push(event));
stateManager.addStateChangedListener(logEvent);

//EFFECTS
export const statisticsApiResponse = {statistics: {dailyStreak: 10, totalMinutesThisWeek: 60}};
const statisticsEffect = (newState, event) => {
    if (event.eventType === statisticsEvents.fetchRequested.eventType) {
        stateManager.getRootVM().children.statistics.events.fetchSucceeded(statisticsApiResponse);
    }
}
stateManager.addStateChangedListener(statisticsEffect);

const saveMeditationEffect = (newState, event) => {
    if (event.eventType === actualMeditationEvents.saveRequested.eventType) {
        stateManager.getRootVM()
            .children.meditationSession
            .children.actualMeditation
            .events.saveSucceeded();
    }
}
stateManager.addStateChangedListener(saveMeditationEffect);

//EVENTS
const events = [];
export const eventWasSent = ({eventType, componentPath, payload}) => events
    .some(evt =>
        evt.eventType === eventType
        && (!componentPath || isEqual(evt.componentPath, componentPath))
        && (!payload || isEqual(evt.payload, payload))
    )

//RESET
const initialState = stateManager.state;
export const reset = () => {
    stateManager.state = initialState;
    events.length = 0;
}

//patch state
export const patchState = (path, patcher) => {
    const res = statePatcher(stateManager)(path, patcher);
    console.log(`patchState with ${JSON.stringify(res)}`);
}

