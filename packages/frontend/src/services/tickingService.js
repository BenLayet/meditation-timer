class TickingService {
    intervalId = false;
    startTicking(callback) {
        this.intervalId = setInterval(callback, 1000);
    }
    stopTicking() {
        clearInterval(this.intervalId);
    }
}

export const tickingService = new TickingService();