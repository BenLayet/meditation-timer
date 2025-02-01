import { Given, When, Then } from '@cucumber/cucumber';
import {onTimerStarted} from "../../src/timer/onTimerStarted.js";
import { expect } from 'chai';
import {onTimerExpired} from "../../src/timer/onTimerExpired.js";
import {onSecondElapsed} from "../../src/timer/onSecondElapsed.js";
import {onTimerStopped} from "../../src/timer/onTimerStopped.js";
import {onTimerReset} from "../../src/timer/onTimerReset.js";

Given('the timer is not running', function () {
    this.state = Object.freeze({...this.state, isRunning: false});
});

Given('the timer is running', function () {
    this.state =  Object.freeze({...this.state, isRunning: true});
});

Given('the time is {int} seconds', function (seconds) {
    this.state = Object.freeze({...this.state, seconds});
});

When('the timer is started', function () {
    this.state = onTimerStarted(this.state);
});
When(/^the timer is stopped$/, function () {
    this.state = onTimerStopped(this.state);
});

When('the timer expires', function () {
    this.state = onTimerExpired(this.state);
});

When('a second has elapsed', function () {
    this.state = onSecondElapsed(this.state);

});
When(/^the timer is reset$/, function () {
    this.state = onTimerReset(this.state);
});
Then('the time should be {int} seconds', function (seconds) {
    expect(this.state.seconds).to.equal(seconds);
});
Then('the timer should be running', function () {
    expect(this.state.isRunning).to.be.true;
});
Then('the timer should not be running', function () {
    expect(this.state.isRunning).to.be.false;
});