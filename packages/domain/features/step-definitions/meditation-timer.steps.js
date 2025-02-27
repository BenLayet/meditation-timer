import {Before, Given, Then, When} from "@cucumber/cucumber";
import {dispatch, reset, state} from "../state-manager/test-state-manager.js";
import {expect} from "chai";
import {
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../../src/components/meditation-session/meditation-session.events.js";
import {
    actualMeditationDurationSet,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {appSelectors} from "../../src/meditation-timer.app.js";
import {mockServices, wasCalled} from "../state-manager/mock-services.js";

const BEGINNING_OF_TIME_IN_SECONDS = 1800000;

Before(function () {
    reset();
});
When(/^I open the app$/, function () {
});

Given(/^I have set the meditation duration to (\d+) minutes$/, function (durationInMinutes) {
    dispatch(actualMeditationDurationSet(durationInMinutes));
});
Given(/^I have started a meditation session$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});

Given(/^The actual meditation has started$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
    dispatch(actualMeditationStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});

When(/^the preparation ends$/, function () {
    const tickCallback = mockServices.tickingService.tickCallBacks['preparation'];
    tickCallback(BEGINNING_OF_TIME_IN_SECONDS + appSelectors.preparation.durationInSeconds(state));
});
When(/^I start a meditation session$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});


When(/^a second has elapsed$/, function () {
    dispatch(actualMeditationTimerTicked(BEGINNING_OF_TIME_IN_SECONDS + 1));
});

When(/^I change the duration of the meditation to (\d+) minutes$/, function (durationInMinutes) {
    dispatch(actualMeditationDurationSet(durationInMinutes));
});

When(/^the actual meditation time is up$/, function () {
    dispatch(actualMeditationTimerTicked(BEGINNING_OF_TIME_IN_SECONDS + 5 * 60));
});

When(/^I stop the meditation session$/, function () {
    dispatch(meditationSessionStopRequested());
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = appSelectors.actualMeditation.displayedTime(state);
    expect(actual).to.equal(expectedDisplayedTime);
});

Then(/^I (can|cannot) start (?:another|a) meditation session$/, function (can) {
    const expected = can === 'can';
    const actual = appSelectors.canMeditationSessionBeStarted(state);
    expect(actual).to.equal(expected);
});

Then(/^the preparation should start$/, function () {
    expect(appSelectors.preparation.isRunning(state)).to.be.true;
});

Then(/^the timer (should|should not) be running$/, function (should) {
    const expected = should === 'should';
    const actual = appSelectors.actualMeditation.isRunning(state);
    expect(actual).to.equal(expected);
});

Then(/^I (can|cannot) stop the meditation session$/, function (can) {
    const expected = can === 'can';
    const actual = appSelectors.canMeditationSessionBeStopped(state);
    expect(actual).to.equal(expected);
});

Then(/^I (can|cannot) set the duration of the meditation$/, function (can) {
    const expected = can === 'can';
    const actual = appSelectors.actualMeditation.canDurationBeSet(state);
    expect(actual).to.equal(expected);

});
Then(/^a gong sound should be played$/, function () {
    expect(wasCalled('gongService', 'play')).to.be.true;
});
Then(/^the meditation timer (should|should not) (?:start|be) running$/, function (should) {
    const expected = should === 'should';
    const actual = appSelectors.actualMeditation.isRunning(state);
    expect(actual).to.equal(expected);
});
Then(/^I can go back to the initial state$/, function () {
    const actual = appSelectors.canMeditationSessionBeReset(state);
    expect(actual).to.be.true;
});
Then(/^the timer should stop$/, function () {
    expect(wasCalled('tickingService', 'stopTicking')).to.be.true;
});
Then(/^the sleep mode should be disabled$/, function () {
    expect(wasCalled('wakeLockService', 'requestWakeLock')).to.be.true;
    expect(wasCalled('wakeLockService', 'releaseWakeLock')).to.be.false;
});