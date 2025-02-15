import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, state} from "../state_manager/test-state-manager.js";
import {expect} from "chai";
import {
    appSelectors
} from "../../src/app/app.selectors.js";
import {appOpened} from "../../src/app/app.events.js";
import {
    meditationDurationSet,
    meditationSessionStarted
} from "../../src/meditation-session/meditation-session.events.js";
import {BEGINNING_OF_TIME_IN_MS} from "../../src/timer/timer.constant.js";
import {actualMeditationStarted} from "../../src/meditation-session/actual-meditation/actual-meditation.events.js";
import {timerTicked} from "../../src/timer/timer.events.js";

Given(/^I have started a meditation session of (\w+) minutes$/, function (durationInMinutes) {
    dispatch(appOpened());
    dispatch(meditationDurationSet(durationInMinutes));
    dispatch(meditationSessionStarted(BEGINNING_OF_TIME_IN_MS));
});

Given(/^The actual meditation period has started$/, function () {
    dispatch(meditationSessionStarted(BEGINNING_OF_TIME_IN_MS));
    dispatch(actualMeditationStarted(BEGINNING_OF_TIME_IN_MS));
});

When(/^I start a meditation session$/, function () {
    dispatch(meditationSessionStarted(BEGINNING_OF_TIME_IN_MS));
});

When(/^I open the app$/, function () {
    dispatch(appOpened());
});

When(/^a second has elapsed$/, function () {
    dispatch(timerTicked(BEGINNING_OF_TIME_IN_MS+1000));
});

When(/^I change the duration of the meditation to (\w+) minutes$/, function (durationInMinutes) {
    dispatch(meditationDurationSet(durationInMinutes));
});

Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    expect(appSelectors.getFormattedTimeToDisplay(state)).to.equal(expectedDisplayedTime);
});

Then(/^I can start a meditation session$/, function () {
    expect(appSelectors.canMeditationSessionBeStarted(state)).to.equal(true);
});

Then(/^I can change the duration of the meditation$/, function () {
    expect(appSelectors.canDurationBeChanged(state)).to.equal(true);
});

Then(/^I can change the volume of the sound of the gong$/, function () {
    expect(appSelectors.canGongVolumeBeChanged(state)).to.equal(true);
});
Then(/^the preparation should start$/, function () {
    expect(appSelectors.isPreparationRunning(state)).to.equal(true);
});
Then(/^the timer should not be running yet$/, function () {

});
Then(/^I can stop the meditation session$/, function () {

});
Then(/^I cannot change the duration of the meditation$/, function () {

});
Then(/^I cannot start another meditation session$/, function () {

});
Given(/^I have started a meditation session$/, function () {

});
When(/^the preparation ends$/, function () {

});
Then(/^a gong sound should be played$/, function () {

});
Then(/^the meditation timer should start running$/, function () {

});
Then(/^I cannot change the meditation duration$/, function () {

});
When(/^the actual meditation ends$/, function () {

});
Then(/^the timer should stop running$/, function () {

});
Then(/^my meditation statistics should appear$/, function () {

});
Then(/^I can go back to the initial state$/, function () {

});
Given(/^I have ran several meditation session$/, function () {

});
Then(/^I should see my meditation statistics$/, function () {

});
When(/^I stop the meditation session$/, function () {

});
Then(/^I can continue the meditation session$/, function () {

});
When(/^I change the volume of the sound of the gong to 50%$/, function () {

});
Then(/^the sound of the gong should be played at 50% of the volume$/, function () {

});