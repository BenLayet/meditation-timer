import {currentTimeInSeconds} from "../lib/time.functions.js";

class TimeoutService {
    timeoutId = null;

    setTimeout(callback, delayInSeconds) {
        this.timeoutId = setTimeout(() => callback(currentTimeInSeconds()), delayInSeconds * 1000);
    }

    clearTimeout() {
        clearTimeout(this.timeoutId);
    }
}

export const timeoutService = new TimeoutService();