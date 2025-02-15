//MOCK SERVICES
const gongService = {
    calls: [],
    play: () => gongService.calls.push('play')
};
const wakeLockService = {
    calls: [],
    requestWakeLock: () => wakeLockService.calls.push('requestWakeLock'),
    releaseWakeLock: () => wakeLockService.calls.push('releaseWakeLock')
};
const tickingService = {
    calls: [],
    startTicking: (callback) => tickingService.calls.push('startTicking'),
    stopTicking: () => tickingService.calls.push('stopTicking')
};
export const mockServices = {
    gongService,
    wakeLockService,
    tickingService,
    reset: () => {
        gongService.calls = [];
        wakeLockService.calls = [];
    }
}