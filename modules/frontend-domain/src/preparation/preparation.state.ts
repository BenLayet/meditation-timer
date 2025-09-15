export const PREPARATION_INITIAL_STATE = {
  timeIncrementInSeconds: 20,
  durationInSeconds: null as number | null,
  remainingSeconds: null as number | null,
  startedTimeInSeconds: null as number | null,
};
export type PreparationState = typeof PREPARATION_INITIAL_STATE;
