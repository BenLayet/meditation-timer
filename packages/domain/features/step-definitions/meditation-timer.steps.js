import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, state} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {appSelectors} from "../../src/app/meditation-timer.app.js";
import {wasCalled} from "./state-manager/mock-services.js";
import {BEGINNING_OF_TIME_IN_SECONDS} from "./state-manager/test-constants.js";

Given(/^the actual meditation has started$/, function () {
    dispatch(actualMeditationStartRequested(state.meditationSettings.meditationDurationInMinutes, BEGINNING_OF_TIME_IN_SECONDS));
});
Given(/^there are (\d+) minutes left in the meditation$/, function (remainingMinutes) {
    dispatch(actualMeditationTimerTicked(BEGINNING_OF_TIME_IN_SECONDS + (remainingMinutes * 60)));
});

When(/^a second has elapsed during actual meditation$/, function () {
    dispatch(actualMeditationTimerTicked(BEGINNING_OF_TIME_IN_SECONDS + 1));
});
When(/^the actual meditation duration has elapsed$/, function () {
    dispatch(actualMeditationTimerTicked(
        BEGINNING_OF_TIME_IN_SECONDS
        + appSelectors.actualMeditation.durationInSeconds(state)));
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = appSelectors.actualMeditation.displayedTime(state);
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^a gong sound should be played$/, function () {
    expect(wasCalled('gongService', 'play')).to.be.true;
});
Then(/^the meditation timer (should|should not) (?:start|be) running$/, function (should) {
    const expected = should === 'should';
    const actual = appSelectors.actualMeditation.isRunning(state);
    expect(actual).to.equal(expected);
});
Then(/^the timer should stop$/, function () {
    expect(wasCalled('tickingService', 'stopTicking')).to.be.true;
});