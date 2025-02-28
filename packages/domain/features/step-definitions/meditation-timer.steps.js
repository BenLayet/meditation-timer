import {Before, Given, Then, When} from "@cucumber/cucumber";
import {dispatch, reset, state} from "../state-manager/test-state-manager.js";
import {expect} from "chai";
import {
    meditationSessionStartRequested,
    meditationSessionResetRequested
} from "../../src/components/meditation-session/meditation-session.events.js";
import {
    actualMeditationLessTimeRequested,
    actualMeditationMoreTimeRequested,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {appSelectors} from "../../src/meditation-timer.app.js";
import {mockServices, wasCalled} from "../state-manager/mock-services.js";
import {
    preparationLessTimeRequested,
    preparationMoreTimeRequested,
    preparationTimerTicked
} from "../../src/components/preparation/preparation.events.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "../../src/components/actual-meditation/actual-meditation.reducers.js";

const BEGINNING_OF_TIME_IN_SECONDS = 1800000;

Before(function () {
    reset();
});
When(/^I open the app$/, function () {
});

Given(/^I have set the meditation duration to (\d+) minutes$/, function (durationInMinutes) {
    const incrementCounts = Math.floor(
        (durationInMinutes - ACTUAL_MEDITATION_INITIAL_STATE.durationInMinutes) / ACTUAL_MEDITATION_INITIAL_STATE.timeIncrementInMinutes);
    for (let i = 0; i < incrementCounts; i++) {
        dispatch(actualMeditationMoreTimeRequested());
    }
});
Given(/^I have started a meditation session$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});

Given(/^the actual meditation has started$/, function () {
    dispatch(meditationSessionStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
    dispatch(actualMeditationStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
});

Given(/^there are (\d+) minutes left in the meditation$/, function (remainingMinutes) {
    dispatch(actualMeditationStartRequested(BEGINNING_OF_TIME_IN_SECONDS));
    dispatch(actualMeditationTimerTicked(BEGINNING_OF_TIME_IN_SECONDS + (remainingMinutes * 60)));
});
Given(/^there are (\d+) seconds left in the preparation$/, function (remainingSeconds) {
    dispatch(preparationTimerTicked(
        BEGINNING_OF_TIME_IN_SECONDS
        + appSelectors.preparation.durationInSeconds(state)
        - remainingSeconds));
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
    dispatch(actualMeditationTimerTicked(
        BEGINNING_OF_TIME_IN_SECONDS
        + appSelectors.actualMeditation.durationInSeconds(state)));
});

When(/^I reset the meditation session$/, function () {
    dispatch(meditationSessionResetRequested());
});
When(/^I request (more|less) time for the meditation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        dispatch(actualMeditationMoreTimeRequested());
    } else {
        dispatch(actualMeditationLessTimeRequested());
    }
});
When(/^I request (more|less) time for the preparation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        dispatch(preparationMoreTimeRequested());
    } else {
        dispatch(preparationLessTimeRequested());
    }
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
    const actual = appSelectors.canMeditationSessionBeReset(state);
    expect(actual).to.equal(expected);
});

Then(/^I (can|cannot) set the duration of the meditation$/, function (can) {
//TODO ?
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
Then(/^the preparation timer should display (\d\d:\d\d)$/, function (displayedTime) {
    expect(appSelectors.preparation.displayedTime(state)).to.equal(displayedTime);
});