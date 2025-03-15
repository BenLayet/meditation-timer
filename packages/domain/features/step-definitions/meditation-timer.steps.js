import {Given, Then, When} from "@cucumber/cucumber";
import {eventWasSent, stateManager} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {BEGINNING_OF_TIME_IN_SECONDS} from "./state-manager/test-constants.js";
import {actualMeditationEvents} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {meditationTimerAppEvents} from "../../src/components/meditation-timer-app/meditation-timer-app.events.js";

Given(/^the actual meditation has started$/, function () {
    stateManager.getRootVM().children.meditationSession.children.actualMeditation.events.startRequested({
        durationInMinutes: 20,
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS
    });
});
Given(/^there are (\d+) minutes left in the meditation$/, function (remainingMinutes) {
    stateManager.getRootVM().children.meditationSession.children.actualMeditation.events.timerTicked({
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS + ((20 - remainingMinutes) * 60)
    });
});

When(/^a second has elapsed during actual meditation$/, function () {
    stateManager.getRootVM().children.meditationSession.children.actualMeditation.events.timerTicked({
        currentTimeInSeconds: BEGINNING_OF_TIME_IN_SECONDS + 1
    });
});
When(/^the actual meditation has completed/, function () {
    stateManager.getRootVM().children.meditationSession.children.actualMeditation.events.completed();
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = stateManager.getRootVM().children.meditationSession.selectors.meditationRemainingTime();
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^the meditation timer (should|should not) (?:start|be) running$/, function (should) {
    const expected = should === 'should';
    const actual = stateManager.getRootVM().children.meditationSession.selectors.meditationIsRunning();
    expect(actual).to.equal(expected);
});
Then(/^a gong sound should be played$/, function () {
    expect(eventWasSent(meditationTimerAppEvents.gongPlayRequested)).to.be.true;
});
Then(/^the timer should stop$/, function () {
    const expectedEvent = {
        ...actualMeditationEvents.timerStopRequested,
        componentPath: ['meditationSession', 'actualMeditation']
    };
    expect(eventWasSent(expectedEvent)).to.be.true;
});