import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, patchState, state} from "./state-manager/test-state-manager.js";
import {expect} from "chai";
import {appSelectors} from "../../src/components/meditation-timer-app/meditation-timer-app.selectors.js";
import {meditationSettingsEvents} from "../../src/components/meditation-settings/meditation-settings.events.js";
import {meditationSettingsSelectors} from "../../src/components/meditation-settings/meditation-settings.selectors.js";

Given(/^the next meditation duration is (\d{2}):00$/, function (minutes) {
    patchState("meditationSettings.meditationDurationInMinutes", parseInt(minutes));
});

Given(/^the next preparation duration is 00:(\d{2})$/, function (seconds) {
    patchState("meditationSettings.preparationDurationInSeconds", parseInt(seconds));
});


When(/^I request (more|less) time for the meditation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        dispatch(meditationSettingsEvents.moreMeditationTimeRequested);
    } else {
        dispatch(meditationSettingsEvents.lessMeditationTimeRequested);
    }
});
When(/^I request (more|less) time for the preparation$/, function (moreOrLess) {
    if (moreOrLess === 'more') {
        dispatch(meditationSettingsEvents.morePreparationTimeRequested);
    } else {
        dispatch(meditationSettingsEvents.lessPreparationTimeRequested);
    }
});

Then(/^the next meditation duration should be (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const meditationSettingsState = appSelectors.meditationSettingsState(state);
    const actual = meditationSettingsSelectors.meditationDuration(meditationSettingsState);
    expect(actual).to.equal(expectedDisplayedTime);
});
Then(/^the next preparation duration should be (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    const meditationSettingsState = appSelectors.meditationSettingsState(state);
    const actual = meditationSettingsSelectors.preparationDuration(meditationSettingsState);
    expect(actual).to.equal(expectedDisplayedTime);
});