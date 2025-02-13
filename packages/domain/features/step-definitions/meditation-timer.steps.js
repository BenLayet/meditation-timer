import {Given, Then, When} from "@cucumber/cucumber";
import {dispatch, state} from "../state_manager/state-manager.js";
import {expect} from "chai";
import {
    canDurationBeChanged,
    canGongVolumeBeChanged,
    canMeditationSessionBeStarted,
    getDisplayedTime
} from "../../src/app/app.selectors.js";

When(/^I open the app$/, function () {
    dispatch('APP_OPENED');
});
Then(/^the timer should display (\d{2}:\d{2})$/, function (expectedDisplayedTime) {
    expect(getDisplayedTime(state)).to.equal(expectedDisplayedTime);
});
Then(/^I can start a meditation session$/, function () {
    expect(canMeditationSessionBeStarted(state)).to.equal(true);
});
Then(/^I can change the duration of the meditation$/, function () {
    expect(canDurationBeChanged(state)).to.equal(true);
});
Then(/^I can change the volume of the sound of the gong$/, function () {
    expect(canGongVolumeBeChanged(state)).to.equal(true);
});
Given(/^the timer displays (\d{2}:\d{2})$/, function (displayedTime) {

});
When(/^I start a meditation session$/, function () {

});
Then(/^the preparation period should start$/, function () {

});
Then(/^the timer should not be running yet$/, function () {

});
Then(/^I can stop the meditation session$/, function () {

});
Given(/^I have started a meditation session$/, function () {

});
Given(/^the preparation period is running$/, function () {

});
When(/^the preparation period ends$/, function () {

});
Then(/^a gong sound should be played$/, function () {

});
Then(/^the meditation timer should start running$/, function () {

});
Then(/^I cannot change the meditation duration$/, function () {

});
Given(/^I have started a meditation session of (\d+) minutes$/, function (durationInMinutes) {
    dispatch('APP_OPENED');
    dispatch('MEDITATION_DURATION_SET', {durationInMinutes});
    dispatch('MEDITATION_SESSION_STARTED', {currentTimestampInSeconds: 0});
});
Given(/^The actual meditation period has started$/, function () {
    dispatch('ACTUAL_MEDITATION_STARTED', {currentTimestampInSeconds: 0});
});
When(/^a second has elapsed$/, function () {
    dispatch('TIMER_TICKED', {currentTimestampInSeconds: 1});
});
When(/^the meditation period ends$/, function () {

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
When(/^I change the duration of the meditation to (\d+) minutes$/, function (durationInMinutes) {
    dispatch('MEDITATION_DURATION_SET', {durationInMinutes});
});
When(/^I change the volume of the sound of the gong to 50%$/, function () {

});
Then(/^the sound of the gong should be played at 50% of the volume$/, function () {

});
Then(/^I cannot change the duration of the meditation$/, function () {

});
Then(/^I cannot start another meditation session$/, function () {

});