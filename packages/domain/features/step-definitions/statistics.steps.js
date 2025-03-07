import {Given, Then} from "@cucumber/cucumber";
import {expect} from "chai";
import {mockServices, wasCalled, when} from "./state-manager/mock-services.js";
import {appSelectors} from "../../src/app/meditation-timer.app.js";
import {state} from "./state-manager/test-state-manager.js";
import {statisticsSelectors} from "../../src/features/statistics/statistics.selectors.js";


Given(/^I had a daily streak of (\d+) days and meditated (\d+) minutes this week$/, function (days, minutes) {
    when(mockServices.meditationRepository.fetchStatistics).thenReturn(Promise.resolve({
        dailyStreak: days, totalMinutesThisWeek: minutes
    }));
});
Then(/^the meditation session should be saved$/, function () {
    expect(wasCalled('meditationRepository', 'saveMeditation')).to.be.true;
});
Then(/^my new daily streak should be displayed$/, function () {
    expect(wasCalled('meditationRepository', 'fetchStatistics'), "fetchStatistics should have been called").to.be.true;
    const statisticsState = appSelectors.statisticsState(state);
    expect(statisticsSelectors.shouldDailyStreakBeDisplayed(statisticsState), 'daily streak should be displayed').to.be.true;
});
Then(/^the statistics are shown$/, function () {
    expect(appSelectors.currentPage(state), 'statistics should be displayed').to.equal('STATISTICS');
});