import {currentTimeInSeconds} from "../lib/time.functions.js";

class TickingService {
    intervalId = null;
    startTicking(callback) {
        this.intervalId = setInterval(() => callback(currentTimeInSeconds()), 1000);
    }
    stopTicking() {
        clearInterval(this.intervalId);
    }
}

export const tickingService = new TickingService();