import { Given, Then, When } from "@cucumber/cucumber";

import { expect } from "chai";
import { meditationSettingsEvents } from "../../src/components/meditation-settings/meditation-settings.events.js";

Given(/^the next meditation duration is (\d{2}):00$/, function (minutes) {
  this.patchState(
    "meditationSettings.meditationDurationInMinutes",
    parseInt(minutes)
  );
});

Given(/^the next preparation duration is 00:(\d{2})$/, function (seconds) {
  this.patchState(
    "meditationSettings.preparationDurationInSeconds",
    parseInt(seconds)
  );
});
Given(/^the gong is (on|off)$/, function (onOrOff) {
  const gongOff = onOrOff === "off";
  this.patchState("meditationSettings.gongOff", gongOff);
});

When(/^I request (more|less) time for the meditation$/, function (moreOrLess) {
  if (moreOrLess === "more") {
    this.vm().children.meditationSettings.dispatchers.moreMeditationTimeRequested();
  } else {
    this.vm().children.meditationSettings.dispatchers.lessMeditationTimeRequested();
  }
});
When(/^I request (more|less) time for the preparation$/, function (moreOrLess) {
  if (moreOrLess === "more") {
    this.vm().children.meditationSettings.dispatchers.morePreparationTimeRequested();
  } else {
    this.vm().children.meditationSettings.dispatchers.lessPreparationTimeRequested();
  }
});
When("I toggle the gong on/off", function () {
  this.vm().children.meditationSettings.dispatchers.gongToggled();
});

Then(
  /^the next meditation duration should be (\d{2}:\d{2})$/,
  function (expectedDisplayedTime) {
    const actual = this.vm().children.meditationSettings.selectors.meditationDuration();
    expect(actual).to.equal(expectedDisplayedTime);
  }
);
Then(
  /^the next preparation duration should be (\d{2}:\d{2})$/,
  function (expectedDisplayedTime) {
    const actual = this.vm().children.meditationSettings.selectors.preparationDuration();
    expect(actual).to.equal(expectedDisplayedTime);
  }
);
Then(/^the gong should be (on|off)$/, function (onOrOff) {
  const expected = onOrOff === "on";

  const isGongOn = this.vm().children.meditationSettings.selectors.isGongOn();
  expect(isGongOn).to.equal(expected);

  const isGongOff = this.vm().children.meditationSettings.selectors.isGongOff();
  expect(isGongOff).to.equal(!expected);

  if (onOrOff === "on") {
    expect(this.eventWasSent(meditationSettingsEvents.gongOnToggled), 'gongOnToggled not called').to.be.true;
  } else {
    expect(this.eventWasSent(meditationSettingsEvents.gongOffToggled), 'gongOffToggled not called').to.be.true;
  }
});
