import { describe, expect, it, test } from "vitest";
import { calculateStatistics } from "./statistics.functions.js";

describe("statistics functions", () => {
  it.each([
    // [previousEpochDays, currentEpochDay, expectedTotal]
    [[1, 2, 3, 4, 5, 6, 7], 8, 70], // 10 minutes every day of the week
    [[1], 8, 10], // 10 minutes once last week
    [[1], 9, 0], // 0 minutes last week
  ])(
    "total minutess should be $2, if previous days are $0 and current is $1",
    (previousEpochDays, currentEpochDay, expectedTotal) => {
      //given
      const previousMeditations = previousEpochDays.map((d) => ({
        startedTimeInSeconds: d * 24 * 3600,
        durationInMinutes: 10,
      }));

      //when
      const actual = calculateStatistics(previousMeditations, currentEpochDay);

      //then
      expect(actual.totalMinutesThisWeek).toEqual(expectedTotal);
    },
  );

  it.each([
    // [previousEpochDays, currentEpochDay, expectedStreak]
    [[1], 1, 1], // same day a last day
    [[1], 2, 1], // day after last day
    [[1, 2], 2, 2], // same day a last day
    [[1, 2], 3, 2], // day after last day
    [[1, 2], 4, 0], // later than day after last day : streak is broken
    [[1, 3], 3, 1], // hole in previous days : only the last one count
    [[1, 1], 1, 1], // same day twice : ignored
  ])(
    "daily streak should be $2, if previous days are $0 and current is $1",
    (previousEpochDays, currentEpochDay, expectedStreak) => {
      //given
      const previousMeditations = previousEpochDays.map((d) => ({
        startedTimeInSeconds: d * 24 * 3600,
        durationInMinutes: 1,
      }));

      //when
      const actual = calculateStatistics(previousMeditations, currentEpochDay);

      //then
      expect(actual.dailyStreak).toEqual(expectedStreak);
    },
  );
});
