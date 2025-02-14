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
export const mockServices = {
    gongService,
    wakeLockService,
    reset: () => {
        gongService.calls = [];
        wakeLockService.calls = [];
    }
}