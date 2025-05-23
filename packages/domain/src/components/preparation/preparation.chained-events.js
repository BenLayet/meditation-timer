import { preparationEvents } from "./preparation.events.js";
import { preparationSelectors } from "./preparation.selectors.js";

export const preparationChainedEvents = [
  {
    onEvent: preparationEvents.completed,
    thenDispatch: preparationEvents.timerStopRequested,
  },
  {
    onEvent: preparationEvents.startRequested,
    thenDispatch: preparationEvents.timerStartRequested,
  },
  {
    onEvent: preparationEvents.stopRequested,
    thenDispatch: preparationEvents.timerStopRequested,
  },
  {
    onEvent: preparationEvents.timerTicked,
    onCondition: ({ state }) => preparationSelectors.isTimeUp(state),
    thenDispatch: preparationEvents.completed,
  },
];
