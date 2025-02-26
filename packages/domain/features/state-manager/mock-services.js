//MOCK SERVICES
const mockServiceCalls = [];
export const resetMocks = () => mockServiceCalls.length = 0;
export const wasCalled = (service, method) => mockServiceCalls
    .some(call => call.service === service && call.method === method);
export const getLastCallArguments = (service, method) => mockServiceCalls
    .findLast(call => call.service === service && call.method === method)
    ?.args;

function createMock(service, methods) {
    return methods.reduce((mock, method) => {
        mock[method] = (...args) => mockServiceCalls.push({service, method, args});
        return mock;
    }, {});
}


export const mockServices = {
    gongService: createMock('gongService', ['play']),
    wakeLockService: createMock('wakeLockService', ['requestWakeLock', 'releaseWakeLock']),
    tickingService: createMock('tickingService', ['startTicking', 'stopTicking']),
}