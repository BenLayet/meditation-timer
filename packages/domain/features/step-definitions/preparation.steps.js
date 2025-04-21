import {Given, Then, When} from "@cucumber/cucumber";
import {patchState, stateManager} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {CURRENT_TIME_IN_SECONDS, PREPARATION_DURATION_IN_SECONDS} from "./state-manager/test-constants.js";


Given(/^the preparation has started$/, function () {
    patchState("meditationSession.preparation.startedTimeInSeconds", CURRENT_TIME_IN_SECONDS);
});
Given(/^there are (\d+) seconds left in the preparation$/, function (remainingSeconds) {
    patchState("meditationSession.preparation.remainingSeconds", remainingSeconds);
});

When(/^the preparation duration has elapsed$/, function () {
    const currentTimeInSeconds = CURRENT_TIME_IN_SECONDS + PREPARATION_DURATION_IN_SECONDS;
    stateManager.getRootVM().children.meditationSession.children.preparation.events.timerTicked({currentTimeInSeconds});
});
When(/^a second has elapsed during preparation$/, function () {
    const currentTimeInSeconds = CURRENT_TIME_IN_SECONDS + 1;
    stateManager.getRootVM().children.meditationSession.children.preparation.events.timerTicked({currentTimeInSeconds});
});

When(/^I request more time during the preparation$/, function () {
    stateManager.getRootVM().children.meditationSession.children.preparation.events.moreTimeRequested();
});
Then(/^the preparation timer should (start|stop) running$/, function (start) {
    const expected = start === 'start';
    const actual = stateManager.getRootVM().children.meditationSession.children.preparation.selectors.isRunning();
    expect(actual).to.equal(expected);
});
Then(/^the preparation timer should display (\d\d:\d\d)$/, function (remainingTime) {
    const actual = stateManager.getRootVM().children.meditationSession.children.preparation.selectors.remainingTime();
    expect(actual).to.equal(remainingTime);
});