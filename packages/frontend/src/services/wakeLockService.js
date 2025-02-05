class WakeLockService {
    constructor() {
        this.wakeLockSentinelPromise = null;
    }

    requestWakeLock() {
        this._requestWakeLock().then();
    }
    releaseWakeLock() {
        this._releaseWakeLock().then();
    }

   async _requestWakeLock() {
        await this._releaseWakeLock();
        this.wakeLockSentinelPromise = navigator.wakeLock?.request('screen');
    }

    async _releaseWakeLock() {
        if (this.wakeLockSentinelPromise) {
            const sentinel = await this.wakeLockSentinelPromise;
            await sentinel?.release();
            this.wakeLockSentinelPromise = null;
        }
    }
}

export const wakeLockService = new WakeLockService();