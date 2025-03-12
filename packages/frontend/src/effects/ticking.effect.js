import {isEqual} from "lodash-es";
import {tickingService} from "../services/tickingService.js";

export const tickingEffect = (events, componentName) => async (newState, event) => {
    if (event.eventType === "timerStartRequested" && isEqual(event.componentPath, ["meditationSession", componentName])) {
        tickingService.startTicking(componentName, (currentTimeInSeconds) => events.timerTicked({currentTimeInSeconds}))
    }
    if (event.eventType === "timerStopRequested" && isEqual(event.componentPath, ["meditationSession", componentName])) {
        tickingService.stopTicking(componentName);
    }
}