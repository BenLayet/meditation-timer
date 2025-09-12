import { expect, it } from "vitest";
import { ZodType, z } from "zod";
export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

type Event<
  EventType extends string,
  PayloadSchema extends ZodType,
  ComponentState extends State,
> = {
  type: EventType;
  payloadSchema: PayloadSchema;
  reducer: (
    state: ComponentState,
    payload: z.infer<PayloadSchema>,
  ) => ComponentState;
};
type Component<EventTypes extends string, ComponentState extends State> = {
  events: Event<EventTypes, ZodType, ComponentState>[];
  initialState: ComponentState;
};

type LoginEvent = "loginRequested" | "loginSucceeded" | "loginFailed";
type LoginState = {
  loading: boolean;
  success: boolean;
};

const LoginComponent: Component<LoginEvent> = {
  events: ["loginRequested", "loginSucceeded", "loginFailed"] as const,
};
type RegisterEvent =
  | "registerRequested"
  | "registerSucceeded"
  | "registerFailed";
const RegisterComponent: Component<RegisterEvent> = {
  events: ["registerRequested", "registerSucceeded", "registerFailed"] as const,
};

const eventLogs: string[] = [];

function createDispatchers<EventName extends string>(
  component: Component<EventName>,
): { [K in EventName]: () => void } {
  const dispatchers = {} as { [K in EventName]: () => void };
  for (const event of component.events) {
    dispatchers[event] = () => {
      console.log(event);
      eventLogs.push(event);
    };
  }
  return dispatchers;
}

it("should work", () => {
  const dispatchers = createDispatchers(LoginComponent);
  dispatchers.loginRequested();
  dispatchers.loginSucceeded();
  dispatchers.loginFailed();

  expect(eventLogs).to.deep.equal([
    "loginRequested",
    "loginSucceeded",
    "loginFailed",
  ]);
});
