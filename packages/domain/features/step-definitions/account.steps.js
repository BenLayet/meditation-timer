import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { accountStatus } from "../../src/models/account.model.js";

Given(/^I have not created an account yet$/, function () {
  delete this.localStorage.account;
});
Given("I have just created an account", function () {
  this.localStorage.account = {
    login: "login1",
    status: accountStatus.AUTHENTICATED,
  };
});
Given(
  "I have created an account on another device and already have a meditation history",
  function () {
    this.remoteStorage.meditationHistory = [
      { startedTimeInSeconds: 1, durationInMinutes: 10 },
    ];
  },
);

When(/^I create an account$/, function () {
  this.vm().children.account.children.createAccountForm.dispatchers.loginInputChanged(
    { loginInputValue: "login1" },
  );
  this.vm().children.account.children.createAccountForm.dispatchers.passwordInputChanged(
    { passwordInputValue: "password1" },
  );
  this.vm().children.account.children.createAccountForm.dispatchers.formSubmitted();
});

When("I log in", function () {
  this.vm().children.account.children.loginForm.dispatchers.loginInputChanged({
    loginInputValue: "login1",
  });
  this.vm().children.account.children.loginForm.dispatchers.passwordInputChanged(
    { passwordInputValue: "password1" },
  );
  this.vm().children.account.children.loginForm.dispatchers.formSubmitted();
});

Then("my account should be deleted", function () {
  expect(this.localStorage.account).to.be.undefined;
});

Then("my account should be persisted", function () {
  expect(this.localStorage.account).to.be.not.undefined;
});

Then("my login should not be visible anymore", function () {
  const isLoginVisible = this.vm().children.account.selectors.isLoginVisible();
  expect(isLoginVisible).to.be.false;
});
Then("I should be able to create an account again", function () {
  const isCreateAccountFormVisible =
    this.vm().children.account.selectors.isCreateAccountFormVisible();
  expect(isCreateAccountFormVisible).to.be.true;
});

Then(/^I should be authenticated$/, function () {
  const isAuthenticated =
    this.vm().children.account.selectors.isAuthenticated();
  expect(isAuthenticated).to.be.true;
  const login = this.vm().children.account.selectors.login();
  expect(login).to.equal("login1");
});

Then(/^I should be able to disconnect$/, function () {
  const canDisconnect = this.vm().children.account.selectors.canDisconnect();
  expect(canDisconnect).to.be.true;
});

Given(
  /^I have connected on multiple devices using the same login$/,
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
  this.localStorage.account = {
    login: "login1",
    status: accountStatus.AUTHENTICATED,
  };
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

Then(
  "I should retrieve my meditation history from my other device",
  function () {
    expect(this.localStorage.meditationHistory).to.deep.equal(
      this.remoteStorage.meditationHistory,
    );
  },
);
