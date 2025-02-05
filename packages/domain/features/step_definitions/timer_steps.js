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