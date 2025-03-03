//MOCK SERVICES
const mockServiceCalls = [];
export const resetMocks = () => mockServiceCalls.length = 0;
export const wasCalled = (service, method) => mockServiceCalls
    .some(call => call.service === service && call.method === method);
export const getLastCallArguments = (service, method) => mockServiceCalls
    .findLast(call => call.service === service && call.method === method)
    ?.args;

function createMockMethod(service, method) {

    const mockedMethod = (...args) => {
        const call = {service, method, args};
        console.log(`MOCK CALLED ${service}.${method}`);
        //console.debug(args);
        mockServiceCalls.push(call);
        if (mockedMethod.preparedReturn) {
            return mockedMethod.preparedReturn;
        }

    };
    return mockedMethod;

}

export function when(method) {
    return {
        thenReturn: (preparedReturn) => {
            method.preparedReturn = preparedReturn;
        }
    }
}

const gongService = {play: createMockMethod('gongService', 'play'), stop: createMockMethod('gongService', 'stop')};
const wakeLockService = {
    requestWakeLock: createMockMethod('wakeLockService', 'requestWakeLock'),
    releaseWakeLock: createMockMethod('wakeLockService', 'releaseWakeLock')
};

const doStartTicking = createMockMethod('tickingService', 'startTicking');
const doStopTicking = createMockMethod('tickingService', 'stopTicking');

const tickingService = {
    tickCallBacks: {},
    startTicking: (name, callback) => {
        doStartTicking(name, callback);
        tickingService.tickCallBacks[name] = callback;
    },
    stopTicking: (name) => () => doStopTicking(name),
    sendTick: (name, timeInSeconds) => tickingService.tickCallBacks[name](timeInSeconds)
};

const meditationRepository = {
    saveMeditation: createMockMethod('meditationRepository', 'saveMeditation'),
    fetchStatistics: createMockMethod('meditationRepository', 'fetchStatistics')
}

when(meditationRepository.fetchStatistics).thenReturn(Promise.resolve({
    dailyStreak: 0,
    totalMinutesThisWeek: 0
}));

export const mockServices = {
    gongService,
    wakeLockService,
    tickingService,
    meditationRepository,
}