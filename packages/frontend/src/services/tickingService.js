import {currentTimeInSeconds} from "../lib/time.functions.js";

class TickingService {
    intervalIds = {};
    startTicking = (timerName) => (callback) =>
        this.intervalIds[timerName] = setInterval(() => callback(currentTimeInSeconds()), 1000);
    stopTicking = (timerName) => () => {
        clearInterval(this.intervalIds[timerName]);
        delete this.intervalIds[timerName];
    }
}

export const tickingService = new TickingService();