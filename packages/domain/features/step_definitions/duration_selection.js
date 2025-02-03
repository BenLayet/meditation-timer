import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import {onDurationSelected} from "../../src/duration-selection/onDurationSelected.js";
import {INITIAL_STATE} from "../../src/initialState.js";
import {onDurationReset} from "../../src/duration-selection/onDurationReset.js";

Given('the duration is not set', function () {
    this.state = INITIAL_STATE;
});

When("a duration of {int} seconds is selected", function (duration) {
    this.state =  onDurationSelected(this.state, duration);
});
When("the duration is reset", function () {
    this.state =  onDurationReset(this.state);
});
Then("the duration should be unset", function () {
    expect(this.state.duration).to.be.undefined;
});

Then("the duration should be {int} seconds", function (duration) {
    expect(this.state.duration).to.be.equal(duration);
});
