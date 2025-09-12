import { z, ZodType } from "zod";
import { expect, it } from "vitest";

export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

// Strict event definition map
type EventDefinitionMap = Record<string, ZodType>;

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

type EventsFromDefinition<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
> = {
  [K in Extract<keyof EventMap, string>]: Event<K, EventMap[K], ComponentState>;
}[Extract<keyof EventMap, string>];

type Component<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
> = {
  events: EventsFromDefinition<EventMap, ComponentState>[];
  initialState: ComponentState;
};

function createDispatchers<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
>(
  component: Component<EventMap, ComponentState>,
  stateContainer: { state: ComponentState },
  eventLogs: string[],
): {
  [K in Extract<keyof EventMap, string>]: (
    payload: z.infer<EventMap[K]>,
  ) => void;
} {
  type EventKey = Extract<keyof EventMap, string>;

  const dispatchers = {} as {
    [K in EventKey]: (payload: z.infer<EventMap[K]>) => void;
  };
  for (const ev of component.events) {
    const type = ev.type as EventKey;
    dispatchers[type] = (payload: any) => {
      const parsed = ev.payloadSchema.parse(payload);

      stateContainer.state = ev.reducer(stateContainer.state, parsed);
      eventLogs.push(type);
    };
  }
  return dispatchers;
}

// Example Usage

const clickSchema = z.object({ x: z.number(), y: z.number() });
const submitSchema = z.object({ value: z.string() });

type MyEvents = {
  click: typeof clickSchema;
  submit: typeof submitSchema;
};

const initialState = { count: 0 };

const myComponent: Component<MyEvents, typeof initialState> = {
  initialState,
  events: [
    {
      type: "click",
      payloadSchema: clickSchema,
      reducer: (state, payload) => ({
        count: state.count + payload.x + payload.y,
      }),
    },
    {
      type: "submit",
      payloadSchema: submitSchema,
      reducer: (state, payload) => ({
        count: state.count + parseInt(payload.value, 10),
      }),
    },
  ],
};

it("should work", () => {
  const eventLogs: string[] = [];
  const stateContainer = { state: myComponent.initialState };
  const dispatchers = createDispatchers(myComponent, stateContainer, eventLogs);
  dispatchers.click({ x: 1, y: 2 });
  dispatchers.submit({ value: "100" });

  expect(eventLogs).to.deep.equal(["click", "submit"]);
  expect(stateContainer.state.count).to.equal(103);
});
it("should throw", () => {
  const eventLogs: string[] = [];
  const stateContainer = { state: myComponent.initialState };
  const dispatchers = createDispatchers(myComponent, stateContainer, eventLogs);
  expect(() => dispatchers.click({ x: 1, y: "2" } as any)).to.throw();
});
