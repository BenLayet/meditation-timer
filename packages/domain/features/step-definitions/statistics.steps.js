import {Given, Then} from "@cucumber/cucumber";
import {expect} from "chai";
import {eventWasSent, stateManager, statisticsApiResponse} from "./state-manager/test-state-manager.js";
import {actualMeditationEvents} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {statisticsEvents} from "../../src/components/statistics/statistics.events.js";

Given(/^I had a daily streak of (\d+) days and meditated (\d+) minutes this week$/, function (days, minutes) {
    statisticsApiResponse.statistics = {
        dailyStreak: days, totalMinutesThisWeek: minutes
    };
});
Then(/^the meditation session should be saved$/, function () {
    expect(eventWasSent(actualMeditationEvents.saveRequested)).to.be.true;
});
Then(/^my new daily streak should be displayed$/, function () {
    expect(eventWasSent({
        ...statisticsEvents.fetchRequested,
        componentPath: ["statistics"]
    }), "fetchStatistics should have been called").to.be.true;
    const actual = stateManager.getRootVM().children.statistics.selectors.shouldDailyStreakBeDisplayed();
    expect(actual, 'daily streak should be displayed').to.be.true;
});
Then(/^the statistics are shown$/, function () {
    const actual = stateManager.getRootVM().selectors.currentPage();
    expect(actual, 'statistics should be displayed').to.equal('STATISTICS');
});