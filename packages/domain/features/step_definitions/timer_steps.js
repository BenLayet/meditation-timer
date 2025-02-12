import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import {onTimerStarted, onTimerTicked} from "../../src/timer/stateUpdaters.js";
import {getFormattedTime, isTimerRunning} from "../../src/timer/selectors.js";

Given('the timer is not running', function () {
    this.state = Object.freeze({...this.state, startedTimestamp: false});
});

Given('the timer is running', function () {
    this.state =  Object.freeze({...this.state, timerIsRunning: true});
});

Given("a duration of {int} seconds is set", function (totalSeconds) {
    this.state =  Object.freeze({...this.state, totalSeconds});
});
Given('the time is {int} seconds', function (remainingSeconds) {
    this.state = Object.freeze({...this.state, remainingSeconds});
});

When('the timer is started', function () {
    this.state = onTimerStarted(this.state, 0);
});
When('a second has elapsed', function () {
    this.state = onTimerTicked(this.state, 1001);
});
Then('the remaining time should be {word}', function (displayedTime) {
    expect(getFormattedTime(this.state)).to.equal(displayedTime);
});
Then('the timer should be running', function () {
    expect(isTimerRunning(this.state), JSON.stringify(this.state)).to.be.true;
});
Then('the timer should not be running', function () {
    expect(isTimerRunning(this.state), JSON.stringify(this.state)).to.be.false;
});
When(/^I go to the app$/, function () {

});
Then(/^I can start a meditation of (\d+) minutes$/, function () {

});
Then(/^I can change the duration of the meditation$/, function () {

});
Then(/^I can change volume of the sound of the notification$/, function () {

});
Then(/^I can change the volume of the sound of the notification$/, function () {

});
Then(/^the timer should display 05:00$/, function () {

});
Then(/^I can start a meditation session$/, function () {

});
Given(/^the timer display 05:00$/, function () {

});
When(/^I start a meditation session$/, function () {

});
Then(/^the preparation should be started$/, function () {

});
Then(/^the timer should not be running yet$/, function () {

});
Given(/^I have started a meditation session$/, function () {

});
Given(/^the preparation time is running$/, function () {

});
When(/^the preparation time is over$/, function () {

});
Then(/^a gong sound should be played$/, function () {

});
Then(/^the meditation timer should start running$/, function () {

});
When(/^the meditation time is over$/, function () {

});
Then(/^the timer should stop running$/, function () {

});