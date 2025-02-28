import {Given, Then} from "@cucumber/cucumber";
import {expect} from "chai";
import {mockServices, wasCalled, when} from "../state-manager/mock-services.js";
import {appSelectors} from "../../src/meditation-timer.app.js";
import {state} from "../state-manager/test-state-manager.js";

Given(/^I had a daily streak of (\d+) days until yesterday$/, function (days) {
    when(mockServices.meditationRepository.fetchStatistics).thenReturn(Promise.resolve({dailyStreak:days}));
});
Then(/^the meditation session should be saved$/, function () {
    expect(wasCalled('meditationRepository', 'saveMeditation')).to.be.true;
});
Then(/^my new daily streak should be displayed$/, function () {
    expect(wasCalled('meditationRepository', 'fetchStatistics')).to.be.true;
    expect(appSelectors.statisticsShouldBeDisplayed(state)).to.be.true;
});