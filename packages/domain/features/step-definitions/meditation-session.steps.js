import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { CURRENT_TIME_IN_SECONDS } from "../support/test-constants.js";
import { meditationSessionEvents } from "../../src/features/meditation-session/meditation-session.events.js";

Given(/^I have started a meditation session$/, function () {
  this.vm().children.meditationSession.dispatchers.startRequested({
    currentTimeInSeconds: CURRENT_TIME_IN_SECONDS,
  });
});

When(/^I start a meditation session$/, function () {
  this.vm().children.meditationSession.dispatchers.startRequested({
    currentTimeInSeconds: CURRENT_TIME_IN_SECONDS,
  });
});
When(/^I stop the meditation session$/, function () {
  this.vm().children.meditationSession.dispatchers.stopRequested();
});
When(/^the session completes$/, function () {
  this.vm().children.meditationSession.dispatchers.completed();
});

Then(/^the sleep mode should be reenabled$/, function () {
  expect(this.eventWasSent(meditationSessionEvents.disableSleepModeRequested))
    .to.be.true;
  expect(this.eventWasSent(meditationSessionEvents.enableSleepModeRequested)).to
    .be.true;
});

Then(/^the sleep mode should be disabled$/, function () {
  expect(this.eventWasSent(meditationSessionEvents.disableSleepModeRequested))
    .to.be.true;
});
