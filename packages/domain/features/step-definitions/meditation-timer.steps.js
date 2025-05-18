import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";
import {CURRENT_TIME_IN_SECONDS} from "../support/test-constants.js";
import {actualMeditationEvents} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {meditationTimerAppEvents} from "../../src/components/meditation-timer-app/meditation-timer-app.events.js";

Given(/^the actual meditation has started$/, function () {
    this.vm().children.meditationSession.children.actualMeditation.dispatchers.startRequested({
        durationInMinutes: 20,
        currentTimeInSeconds: CURRENT_TIME_IN_SECONDS
    });
});
Given(/^there are (\d+) minutes left in the meditation$/, function (remainingMinutes) {
    this.vm().children.meditationSession.children.actualMeditation.dispatchers.timerTicked({
        currentTimeInSeconds: CURRENT_TIME_IN_SECONDS + ((20 - remainingMinutes) * 60)
    });
});

When(/^a second has elapsed during actual meditation$/, function () {
    this.vm().children.meditationSession.children.actualMeditation.dispatchers.timerTicked({
        currentTimeInSeconds: CURRENT_TIME_IN_SECONDS + 1
    });
});
When(/^the actual meditation has completed/, function () {
    this.vm().children.meditationSession.children.actualMeditation.dispatchers.completed();
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = this.vm().children.meditationSession.selectors.meditationRemainingTime();
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^the meditation timer (should|should not) (?:start|be) running$/, function (should) {
    const expected = should === 'should';
    const actual = this.vm().children.meditationSession.selectors.meditationIsRunning();
    expect(actual).to.equal(expected);
});
Then(/^a gong sound should be played$/, function () {
    expect(this.eventWasSent(meditationTimerAppEvents.gongPlayRequested)).to.be.true;
});
Then(/^the timer should stop$/, function () {
    const expectedEvent = {
        ...actualMeditationEvents.timerStopRequested,
        componentPath: ['meditationSession', 'actualMeditation']
    };
    expect(this.eventWasSent(expectedEvent)).to.be.true;
});