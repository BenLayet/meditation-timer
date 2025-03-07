import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch} from "./state-manager/test-state-manager.js";
import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../../src/features/meditation-session/meditation-session.events.js";
import {expect} from "chai";
import {wasCalled} from "./state-manager/mock-services.js";
import {BEGINNING_OF_TIME_IN_SECONDS} from "./state-manager/test-constants.js";

Given(/^I have started a meditation session$/, function () {
    dispatch(meditationSessionStartRequested({currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS}));
});

When(/^I start a meditation session$/, function () {
    dispatch(meditationSessionStartRequested({currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS}));
});
When(/^I stop the meditation session$/, function () {
    dispatch(meditationSessionStopRequested());
});
When(/^the session completes$/, function () {
    dispatch(meditationSessionCompleted());
});

Then(/^the sleep mode should be reenabled$/, function () {
    expect(wasCalled('wakeLockService', 'requestWakeLock')).to.be.true;
    expect(wasCalled('wakeLockService', 'releaseWakeLock')).to.be.true;
});
Then(/^the sleep mode should be disabled$/, function () {
    expect(wasCalled('wakeLockService', 'requestWakeLock')).to.be.true;
    expect(wasCalled('wakeLockService', 'releaseWakeLock')).to.be.false;
});