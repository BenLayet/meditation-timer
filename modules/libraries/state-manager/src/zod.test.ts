import { expect, it } from "vitest";
import { z, ZodObject } from "zod";
export type Value =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Value }
  | Value[];

type EventDefinition<
  EventType extends string,
  PayloadSchema extends ZodObject,
  FeatureState extends Value,
> = {
  type: EventType;
  payloadSchema: PayloadSchema;
  handler: (
    payload: z.infer<PayloadSchema>,
    state: FeatureState,
  ) => FeatureState;
};
enum EventTypes {
  loginRequested = "loginRequested",
  loginsucceeded = "loginsucceeded",
  oginfailed = "loginfailed",
}
const loginRequestedPayloadSchema = z.object({
  date: z.string(),
  login: z.string(),
  password: z.string(),
});
type LoginState = {
  date: string;
  login: string;
  loading: boolean;
  success: boolean;
};
const loginRequestedDefinition: EventDefinition<
  EventTypes.loginRequested,
  typeof loginRequestedPayloadSchema,
  LoginState
> = {
  type: EventTypes.loginRequested,
  payloadSchema: loginRequestedPayloadSchema,
  handler(payload, state) {
    console.log(payload.date);
    return { ...state, date: payload.date, loading: true, success: false };
  },
};

type Event<PayloadSchema extends ZodObject> = {
  payload: z.infer<PayloadSchema>;
};

let state: LoginState = {
  date: "",
  login: "",
  loading: false,
  success: false,
};

const allEventDefinitions: Record<EventTypes, EventDefinition<any, any>> = {
  [EventTypes.LOGIN_REQUESTED]: loginRequestedDefinition,
};

const dispatch = (event: Event<any>) => {
  const eventDefinition = allEventDefinitions[event.type];
  state = loginRequestedDefinition.handler(event.payload, state);
};

type Component<EventEnum> = {
  events: EventEnum[];
};

const createDispatchers = (component: Component<EventEnum>) => {
  const viewModel = {
    date: state.date,
    login: state.login,
    loading: state.loading,
    success: state.success,
  };
  return viewModel;
};

it("should work", () => {
  expect(true).to.be.true;
});
