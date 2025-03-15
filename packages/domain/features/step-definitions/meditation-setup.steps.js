import {Given, Then, When} from "@cucumber/cucumber";
import {patchState, stateManager} from "./state-manager/test-state-manager.js";
import {expect} from "chai";

Given(/^the next meditation duration is (\d{2}):00$/, function (minutes) {
    patchState("meditationSettings.meditationDurationInMinutes", parseInt(minutes));
});

Given(/^the next preparation duration is 00:(\d{2})$/, function (seconds) {
    patchState("meditationSettings.preparationDurationInSeconds", parseInt(seconds));
});


When(/^I request (more|less) time for the meditation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        stateManager.getRootVM().children.meditationSettings.events.moreMeditationTimeRequested();
    } else {
        stateManager.getRootVM().children.meditationSettings.events.lessMeditationTimeRequested();
    }
});
When(/^I request (more|less) time for the preparation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        stateManager.getRootVM().children.meditationSettings.events.morePreparationTimeRequested();
    } else {
        stateManager.getRootVM().children.meditationSettings.events.lessPreparationTimeRequested();
    }
});

Then(/^the next meditation duration should be (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = stateManager.getRootVM().children.meditationSettings.selectors.meditationDuration();
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^the next preparation duration should be (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const actual = stateManager.getRootVM().children.meditationSettings.selectors.preparationDuration();
    expect(actual).to.equal(expectedDisplayedTime);
});