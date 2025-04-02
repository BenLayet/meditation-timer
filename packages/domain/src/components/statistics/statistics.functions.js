const getDailyStreak = (previousEpochDays, currentEpochDay) => {
  let streak = 0;
  while (previousEpochDays.includes(currentEpochDay - streak - 1)) streak++;
  if (previousEpochDays.includes(currentEpochDay)) streak++;
  return streak;
};

const getEpochDay = (meditation) =>
  Math.floor(meditation.startedTimeInSeconds / (24 * 3600));
const getDurationInMinutes = (meditation) => meditation.durationInMinutes;

const DAYS_IN_A_WEEK = 7;
const totalMinutesOnWeekBefore = (meditations, currentEpochDay) =>
  // includes last week monday if current epoch days is a monday
  meditations
    .filter(
      (meditation) =>
        getEpochDay(meditation) >= currentEpochDay - DAYS_IN_A_WEEK
    )
    .map(getDurationInMinutes)
    .reduce((a, b) => a + b, 0);
    
export const calculateStatistics = (previousMeditations = [], currentEpochDay=0) => ({
  dailyStreak: getDailyStreak(
    previousMeditations.map(getEpochDay),
    currentEpochDay
  ),
  totalMinutesThisWeek: totalMinutesOnWeekBefore(
    previousMeditations,
    currentEpochDay
  ),
});
