import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, state} from "../state-manager/test-state-manager.js";
import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../../src/components/meditation-session/meditation-session.events.js";
import {expect} from "chai";
import {wasCalled} from "../state-manager/mock-services.js";
import {BEGINNING_OF_TIME_IN_SECONDS} from "../state-manager/test-constants.js";
import {appSelectors} from "../../src/app/meditation-timer.app.js";

Given(/^I have started a meditation session$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});

When(/^I start a meditation session$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
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
Then(/^I (can|cannot) stop the meditation session$/, function (can) {
    const expected = can === 'can';
    const actual = appSelectors.canMeditationSessionBeReset(state);
    expect(actual).to.equal(expected);
});
