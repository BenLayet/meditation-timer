class WakeLockService {
    constructor() {
        this.wakeLock = null;
    }

    async request() {
        await this.release();
        this.wakeLock = navigator.wakeLock?.request('screen');
    }

    async release() {
        if (this.wakeLock) {
            await this.wakeLock.release();
        }
    }
}

export default WakeLockService;