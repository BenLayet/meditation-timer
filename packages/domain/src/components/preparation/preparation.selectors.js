const isRunning = (preparationState) => preparationState.isRunning;
const durationInSeconds = (preparationState) => preparationState.durationInSeconds;
export const preparationSelectors = {
    isRunning,
    durationInSeconds
};