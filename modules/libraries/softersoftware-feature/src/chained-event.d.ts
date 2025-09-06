import { EventLocator } from "./event-locator";
import { State } from "./state";

export type ChainedEvent<FeatureState extends State> = {
  onEvent: EventLocator;
  thenDispatch: EventLocator;
  withPayload?: (args: { previousPayload?: object; state?: FeatureState }) => object;
  onCondition?: (args: { previousPayload?: object; state?: FeatureState }) => boolean;
};
