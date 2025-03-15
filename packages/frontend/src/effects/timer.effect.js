import {tickingService} from "../services/tickingService.js";

export const timerStartEffect = (events, componentName) => () =>
    tickingService.startTicking(componentName, (currentTimeInSeconds) => events.timerTicked({currentTimeInSeconds}));

export const timerStopEffect = (componentName) => () => tickingService.stopTicking(componentName);