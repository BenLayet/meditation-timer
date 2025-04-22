import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";
import {CURRENT_TIME_IN_SECONDS} from "./state-manager/test-constants.js";
import {eventWasSent, stateManager} from "./state-manager/test-state-manager.js";
import {meditationSessionEvents} from "../../src/components/meditation-session/meditation-session.events.js";

Given(/^I have started a meditation session$/, function () {
    stateManager.getRootVM().children.meditationSession.dispatchers.startRequested({currentTimeInSeconds: CURRENT_TIME_IN_SECONDS});
});

When(/^I start a meditation session$/, function () {
    stateManager.getRootVM().children.meditationSession.dispatchers.startRequested({currentTimeInSeconds: CURRENT_TIME_IN_SECONDS});
});
When(/^I stop the meditation session$/, function () {
    stateManager.getRootVM().children.meditationSession.dispatchers.stopRequested();
});
When(/^the session completes$/, function () {
    stateManager.getRootVM().children.meditationSession.dispatchers.completed();
});

Then(/^the sleep mode should be reenabled$/, function () {
    expect(eventWasSent(meditationSessionEvents.disableSleepModeRequested)).to.be.true;
    expect(eventWasSent(meditationSessionEvents.enableSleepModeRequested)).to.be.true;
});

Then(/^the sleep mode should be disabled$/, function () {
    expect(eventWasSent(meditationSessionEvents.disableSleepModeRequested)).to.be.true;
});