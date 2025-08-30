import { map } from "../../lib/functions/object.functions.js";
import { flow } from "lodash-es";

const isSynchronizing = (state) => state.isSynchronizing;
const lastSynchronizedEpochSeconds = (state) =>
  state.lastSynchronizedEpochSeconds;

export const ownStateSelectors = {
  isSynchronizing,
  lastSynchronizedEpochSeconds,
};

const ownState = (compositeState) => compositeState.ownState;

export const synchronizationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
