import { map } from "@softersoftware/functions/object.functions";
import { flow } from "lodash-es";

const isSynchronizing = (state) => state.isSynchronizing;
const lastSynchronizedEpochSeconds = (state) =>
  state.lastSynchronizedEpochSeconds;
const wasLastSynchronizationInError = (state) => state.errorCodes?.length > 0;
export const ownStateSelectors = {
  isSynchronizing,
  lastSynchronizedEpochSeconds,
  wasLastSynchronizationInError,
};

const ownState = (compositeState) => compositeState.ownState;

export const synchronizationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
