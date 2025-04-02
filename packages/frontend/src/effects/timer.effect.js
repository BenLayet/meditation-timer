import {tickingService} from "../services/ticking.service.js";

export const startTimer = (events, componentName) => () =>
    tickingService.startTicking(componentName, (currentTimeInSeconds) => events.timerTicked({currentTimeInSeconds}));

export const stopTimer = (componentName) => () => tickingService.stopTicking(componentName);