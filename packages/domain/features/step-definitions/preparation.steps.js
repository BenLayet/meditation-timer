import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, patchState, state} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {appSelectors} from "../../src/app/meditation-timer.app.js";
import {mockServices} from "./state-manager/mock-services.js";
import {moreTimeDuringPreparationRequested} from "../../src/features/preparation/preparation.events.js";
import {BEGINNING_OF_TIME_IN_SECONDS, PREPARATION_DURATION_IN_SECONDS} from "./state-manager/test-constants.js";
import {preparationSelectors} from "../../src/features/preparation/preparation.selectors.js";
import {meditationSessionSelectors} from "../../src/features/meditation-session/meditation-session.selectors.js";


Given(/^the preparation has started$/, function () {
    patchState("meditationSession.preparation.startedTimeInSeconds", BEGINNING_OF_TIME_IN_SECONDS);
});
Given(/^there are (\d+) seconds left in the preparation$/, function (remainingSeconds) {
    patchState("meditationSession.preparation.remainingSeconds", remainingSeconds);
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
    const meditationSessionState = appSelectors.meditationSessionState(state);
    const preparationState = meditationSessionSelectors.preparationState(meditationSessionState);
    expect(preparationSelectors.isRunning(preparationState)).to.equal(isRunning);
});
Then(/^the preparation timer should display (\d\d:\d\d)$/, function (remainingTime) {
    const meditationSessionState = appSelectors.meditationSessionState(state);
    const preparationState = meditationSessionSelectors.preparationState(meditationSessionState);
    expect(preparationSelectors.remainingTime(preparationState)).to.equal(remainingTime);
});