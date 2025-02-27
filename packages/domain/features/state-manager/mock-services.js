//MOCK SERVICES
const mockServiceCalls = [];
export const resetMocks = () => mockServiceCalls.length = 0;
export const wasCalled = (service, method) => mockServiceCalls
    .some(call => call.service === service && call.method === method);
export const getLastCallArguments = (service, method) => mockServiceCalls
    .findLast(call => call.service === service && call.method === method)
    ?.args;

function mock(service, method) {
    return (...args) => {
        const call = {service, method, args};
        console.log(`MOCK CALLED ${service}.${method}`);
        //console.debug(args);
        mockServiceCalls.push(call);
    };

}

const gongService = {play: mock('gongService', 'play'), stop: mock('gongService', 'stop')};
const wakeLockService = {
    requestWakeLock: mock('wakeLockService', 'requestWakeLock'),
    releaseWakeLock: mock('wakeLockService', 'releaseWakeLock')
};

const doStartTicking = mock('tickingService', 'startTicking');
const doStopTicking = mock('tickingService', 'stopTicking');

const tickingService = {
    tickCallBacks:{},
    startTicking: (name, callback) => {
        doStartTicking(name, callback);
        tickingService.tickCallBacks[name] = callback;
    } ,
    stopTicking: () => doStopTicking
};

export const mockServices = {
    gongService,
    wakeLockService,
    tickingService,
}