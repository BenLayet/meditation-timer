import {Given, Then} from "@cucumber/cucumber";
import {expect} from "chai";
import {wasCalled} from "../state-manager/mock-services.js";

Given(/^I have ran several meditation session$/, function () {

});
Then(/^I should see my meditation statistics$/, function () {

});
Then(/^my meditation statistics should appear$/, function () {
//TODO
});
Then(/^the meditation session should be saved$/, function () {
    expect(wasCalled('meditationRepository', 'saveMeditation')).to.be.true;
});