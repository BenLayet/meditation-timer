import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, state} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {
    actualMeditationCompleted,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "../../src/features/actual-meditation/actual-meditation.events.js";
import {appSelectors} from "../../src/app/meditation-timer.app.js";
import {wasCalled} from "./state-manager/mock-services.js";
import {BEGINNING_OF_TIME_IN_SECONDS} from "./state-manager/test-constants.js";
import {meditationSessionSelectors} from "../../src/features/meditation-session/meditation-session.selectors.js";

Given(/^the actual meditation has started$/, function () {
    dispatch(actualMeditationStartRequested({
        durationInMinutes: state.meditationSettings.meditationDurationInMinutes,
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS
    }));
});
Given(/^there are (\d+) minutes left in the meditation$/, function (remainingMinutes) {
    dispatch(actualMeditationTimerTicked({
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS + (remainingMinutes * 60)
    }));
});

When(/^a second has elapsed during actual meditation$/, function () {
    dispatch(actualMeditationTimerTicked({
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS + 1
    }));
});
When(/^the actual meditation has completed/, function () {
    dispatch(actualMeditationCompleted());
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = meditationSessionSelectors.meditationRemainingTime(appSelectors.meditationSessionState(state));
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^a gong sound should be played$/, function () {
    expect(wasCalled('gongService', 'play')).to.be.true;
});
Then(/^the meditation timer (should|should not) (?:start|be) running$/, function (should) {
    const expected = should === 'should';
    const actual = meditationSessionSelectors.meditationIsRunning(appSelectors.meditationSessionState(state));
    expect(actual).to.equal(expected);
});
Then(/^the timer should stop$/, function () {
    expect(wasCalled('tickingService', 'stopTicking')).to.be.true;
});