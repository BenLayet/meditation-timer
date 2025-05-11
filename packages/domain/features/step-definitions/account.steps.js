import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { stateManager, eventWasSent, account } from "./state-manager/test-state-manager.js";
import { accountEvents } from "../../src/components/account/account.events.js";

Given(/^I have used the app without an account$/, function () {
    account.email = null;
});

When(/^I provide my email$/, function () {
    stateManager.getRootVM().children.account.dispatchers.emailProvided({ email: "test@example.com" });
});

Then(/^I should receive an email with a activation link in my inbox$/, function () {
    expect(eventWasSent(accountEvents.sendEmailActivationRequested)).to.be.true;
});

Then(/^I can see that my email is pending activation in the app settings$/, function () {
    const isEmailProvided = stateManager.getRootVM().children.account.selectors.isEmailProvided();
    expect(isEmailProvided).to.be.true;
    const email = stateManager.getRootVM().children.account.selectors.email();
    expect(email).to.equal("test@example.com");
    const status = stateManager.getRootVM().children.account.selectors.status();
    expect(status).to.equal("PENDING_ACTIVATION");
});

Given(/^I have received an email with an activation link$/, function () {
    account.email = "test@example.com";
});

When(/^I click the link$/, function () {
    account.status = "ACTIVATED";
});

Then(/^my device should be linked to my email$/, function () {
    const isEmailProvided = stateManager.getRootVM().children.account.selectors.isEmailProvided();
    expect(isEmailProvided, "email is not provided").to.be.true;
    const email = stateManager.getRootVM().children.account.selectors.email();
    expect(email, "email is not provided").to.equal("test@example.com");
    const status = stateManager.getRootVM().children.account.selectors.status();
    expect(status).to.equal("ACTIVATED");
});



Given(/^I have linked multiple devices to my email$/, function () {
    account.devices = ["device1", "device2"];
});

When(/^I add a new meditation on one device$/, function () {
    //TODO
});

Then(/^the new meditation should appear on all linked devices$/, function () {
    //TODO
});

Given(/^I have linked a device to my email$/, function () {
    account.devices = ["device1"];
    account.email = "";
    account.isEmailValidated = true;
});
Then('I should be able to unlink the device from my email', function () {
    const canUnlinkingBeRequested = stateManager.getRootVM().children.account.selectors.canUnlinkingBeRequested();
    expect(canUnlinkingBeRequested).to.true;
});

When(/^I unlink the device from my email$/, function () {
    stateManager.getRootVM().children.account.dispatchers.unlinkingRequested();
});

Then(/^my meditation history on the device should be cleared$/, function () {
    const dailyStreak = stateManager.getRootVM().children.statistics.selectors.dailyStreak();
    expect(dailyStreak).to.equal(0);
});

Then(/^I can link the device to a different email$/, function () {
    const isEmailProvided = stateManager.getRootVM().children.account.selectors.isEmailProvided();
    expect(isEmailProvided).to.be.false;
});

Then(/^my meditation history on the server should remain intact$/, function () {
    //TODO
});