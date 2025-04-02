import {Given, Then} from "@cucumber/cucumber";
import {expect} from "chai";
import {eventWasSent, stateManager, meditationStorage} from "./state-manager/test-state-manager.js";
import {actualMeditationEvents} from "../../src/components/actual-meditation/actual-meditation.events.js";
import {statisticsEvents} from "../../src/components/statistics/statistics.events.js";
import {CURRENT_EPOCH_DAY} from "./state-manager/test-constants.js";

Given(/^I had a daily streak of (\d+) days and meditated (\d+) minutes every day$/, function (days, minutes) {

    meditationStorage.meditationHistory= Array.from(
       { length: days },
        (_, i) => ({
           startedTimeInSeconds:(CURRENT_EPOCH_DAY-i)*24*3600,
           durationInMinutes:minutes
        }));
    console.log(meditationStorage);
});
Then(/^the meditation session should be saved$/, function () {
    expect(eventWasSent(actualMeditationEvents.saveRequested)).to.be.true;
});
Then(/^my new daily streak should be displayed$/, function () {

    expect(eventWasSent({
        ...actualMeditationEvents.saveSucceeded,
        componentPath: ["meditationSession", "actualMeditation"]
    }), "saveSucceeded should have been called").to.be.true;
    expect(eventWasSent({
        ...statisticsEvents.statisticsRequested,
        componentPath: ["statistics"]
    }), "statisticsRequested should have been called").to.be.true;
    
    expect(eventWasSent({
        ...statisticsEvents.meditationHistoryRequested,
        componentPath: ["statistics"]
    }), "meditationHistoryRequested should have been called").to.be.true; 

    let actual;

    actual = stateManager.getRootVM().children.statistics.selectors.hourCountThisWeek();
    expect(actual.count, 'hourCountThisWeek').to.equal(3);

    actual = stateManager.getRootVM().children.statistics.selectors.dailyStreak();
    expect(actual, 'daily streak').to.equal(5);


    actual = stateManager.getRootVM().children.statistics.selectors.shouldDailyStreakBeDisplayed();
    expect(actual, 'daily streak should be displayed').to.be.true;
});
Then(/^the statistics are shown$/, function () {
    const actual = stateManager.getRootVM().selectors.currentPage();
    expect(actual, 'statistics should be displayed').to.equal('STATISTICS');
});