import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { emailVerificationEvents } from "../../src/components/email-verification/email-verification.events.js";
import { accountStatus } from "../../src/components/account/account.state.js";
import { emailVerificationStatus } from "../../src/models/email-verification.model.js";

Given(/^I have not created an account yet$/, function () {
  this.account.email = null;
  this.account.status = accountStatus.ANONYMOUS;
});
Given("I have just created an account", function () {
  this.account.email = "test@example.org";
  this.account.status = accountStatus.PENDING_VERIFICATION;
});

When(/^I create an account with my email$/, function () {
  this.vm().children.account.dispatchers.createAccountRequested({
    email: "test@example.org",
  });
});

Then(
  /^I should receive an email with a verification link in my inbox$/,
  function () {
    expect(this.eventWasSent(emailVerificationEvents.verificationRequested)).to
      .be.true;
  },
);

Then(/^I can see that my email is pending verification$/, function () {
  const email = this.vm().children.account.selectors.email();
  expect(email).to.equal("test@example.org");
  const isPendingVerification =
    this.vm().children.account.selectors.isPendingVerification();
  expect(isPendingVerification).to.be.true;
});

Then(/^I can cancel the account creation$/, function () {
  const canAccountCreationBeCancelled =
    this.vm().children.account.selectors.canAccountCreationBeCancelled();
  expect(canAccountCreationBeCancelled).to.be.true;
});

When(/^I cancel the account creation$/, function () {
  this.vm().children.account.dispatchers.createAccountCancelled();
});

Then("my email should not be visible anymore", function () {
  const isAnonymous = this.vm().children.account.selectors.isAnonymous();
  expect(isAnonymous).to.be.true;
});
Then("I should be able to create an account again", function () {
  const canCreateAccount =
    this.vm().children.account.selectors.canCreateAccount();
  expect(canCreateAccount).to.be.true;
});

Given(/^I have not verified my email yet$/, function () {
  this.remoteEmailVerification.status =
    emailVerificationStatus.VERIFICATION_LINK_SENT;
});

Given(/^I have just clicked the link to verify my email$/, function () {
  this.account.email = "test@example.org";
  this.account.status = accountStatus.AUTHENTICATED;
});

Then(/^I should be authenticated$/, function () {
  const isAuthenticated =
    this.vm().children.account.selectors.isAuthenticated();
  expect(isAuthenticated).to.be.true;
  const email = this.vm().children.account.selectors.email();
  expect(email).to.equal("test@example.org");
});

Then(/^I should be able to disconnect$/, function () {
  const canDisconnect = this.vm().children.account.selectors.canDisconnect();
  expect(canDisconnect).to.be.true;
});

Given(
  /^I have connected on multiple devices using the same email address$/,
  function () {
    //TODO
  },
);

When(/^I add a new meditation on one device$/, function () {
  //TODO
});

Then(/^the new meditation should appear on all devices$/, function () {
  //TODO
});

Given("I am authenticated", function () {
  this.account.email = "test@example.org";
  this.account.status = accountStatus.AUTHENTICATED;
});

When("I disconnect", function () {
  this.vm().children.account.dispatchers.disconnectRequested();
});
Then(/^my meditation history on the device should be cleared$/, function () {
  const dailyStreak = this.vm().children.statistics.selectors.dailyStreak();
  expect(dailyStreak).to.equal(0);
});

Then(/^my meditation history on the server should remain intact$/, function () {
  //TODO
});
