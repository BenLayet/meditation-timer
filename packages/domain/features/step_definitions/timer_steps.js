import { Given, When, Then } from '@cucumber/cucumber';
import {onTimerStarted} from "../../src/timer/onTimerStarted.js";
import { expect } from 'chai';
import {onTimerTicked} from "../../src/timer/onTimerTicked.js";

Given('the timer is not running', function () {
    this.state = Object.freeze({...this.state, timerIsRunning: false});
});

Given('the timer is running', function () {
    this.state =  Object.freeze({...this.state, timerIsRunning: true});
});

Given("the duration is {int} seconds", function (duration) {
    this.state =  Object.freeze({...this.state, duration});
});
Given('the time is {int} seconds', function (seconds) {
    this.state = Object.freeze({...this.state, seconds});
});

When('the timer is started', function () {
    this.state = onTimerStarted(this.state);
});

When('a second has elapsed', function () {
    this.state = onTimerTicked(this.state);

});
Then('the remaining time should be {int} seconds', function (seconds) {
    expect(this.state.seconds).to.equal(seconds);
});
Then('the timer should be running', function () {
    expect(this.state.timerIsRunning).to.be.true;
});
Then('the timer should not be running', function () {
    expect(this.state.timerIsRunning).to.be.false;
});
Then("the timer should be displayed", function () {
    expect(this.state.timerIsDisplayed).to.be.true;
});

Then("the timer should not be displayed", function () {
    expect(this.state.timerIsDisplayed).to.be.false;
});
