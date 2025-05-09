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
    expect(eventWasSent(accountEvents.emailActivationLinkRequested)).to.be.true;
});

Then(/^I can see that my email is pending validation in the app settings$/, function () {
    const isEmailProvided = stateManager.getRootVM().children.account.selectors.isEmailProvided();
    expect(isEmailProvided).to.be.true;
    const email = stateManager.getRootVM().children.account.selectors.email();
    expect(email).to.equal("test@example.com");
    const isPending = stateManager.getRootVM().children.account.selectors.isEmailPendingValidation();
    expect(isPending).to.be.true;
});

Given(/^I have received an email with an activation link$/, function () {
    account.email = "test@example.com";
});

When(/^I click the link$/, function () {
    account.isEmailValidated = true;
});

Then(/^my device should be linked to my email$/, function () {
    const isEmailProvided = stateManager.getRootVM().children.account.selectors.isEmailProvided();
    expect(isEmailProvided, "email is not provided").to.be.true;
    const email = stateManager.getRootVM().children.account.selectors.email();
    expect(email, "email is not provided").to.equal("test@example.com");
    const isPending = stateManager.getRootVM().children.account.selectors.isEmailPendingValidation();
    expect(isPending, "email is still pending validation").to.be.false;
    const isEmailValidated = stateManager.getRootVM().children.account.selectors.isEmailValidated();
    expect(isEmailValidated, "email is not validated").to.be.true;
});

Then(/^I can see that my email is validated in the app settings$/, function () {
    const isValidated = stateManager.getRootVM().children.account.selectors.isEmailValidated();
    expect(isValidated).to.be.true;
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

When(/^I remove the link$/, function () {
    stateManager.getRootVM().children.account.dispatchers.unlinkEmailRequested();
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