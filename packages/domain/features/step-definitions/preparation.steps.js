import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, patchState, state} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {appSelectors} from "../../src/app/meditation-timer.app.js";
import {mockServices} from "./state-manager/mock-services.js";
import {moreTimeDuringPreparationRequested} from "../../src/components/preparation/preparation.events.js";
import {BEGINNING_OF_TIME_IN_SECONDS, PREPARATION_DURATION_IN_SECONDS} from "./state-manager/test-constants.js";


Given(/^the preparation has started$/, function () {
    patchState("preparation.startedTimeInSeconds", BEGINNING_OF_TIME_IN_SECONDS);
});
Given(/^there are (\d+) seconds left in the preparation$/, function (remainingSeconds) {
    patchState("preparation.remainingSeconds", remainingSeconds);
});

When(/^the preparation duration has elapsed$/, function () {
    mockServices.tickingService.sendTick('preparation', BEGINNING_OF_TIME_IN_SECONDS + PREPARATION_DURATION_IN_SECONDS);
});
When(/^a second has elapsed during preparation$/, function () {
    mockServices.tickingService.sendTick('preparation', BEGINNING_OF_TIME_IN_SECONDS + 1);
});

When(/^I request more time during the preparation$/, function () {
    dispatch(moreTimeDuringPreparationRequested());
});

Then(/^the preparation timer should (start|stop) running$/, function (start) {
    const isRunning = start === 'start';
    expect(appSelectors.preparation.isRunning(state)).to.equal(isRunning);
});
Then(/^the preparation timer should display (\d\d:\d\d)$/, function (displayedTime) {
    expect(appSelectors.preparation.displayedTime(state)).to.equal(displayedTime);
});