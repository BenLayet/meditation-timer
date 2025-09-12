import { z, ZodType } from "zod";
import { expect, it } from "vitest";

export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

// Event type, as before
type Event<
  EventType extends string,
  PayloadSchema extends ZodType,
  S extends State,
> = {
  type: EventType;
  payloadSchema: PayloadSchema;
  reducer: (state: S, payload: z.infer<PayloadSchema>) => S;
};

// Helper: Get the union of event type strings from the events array
type EventTypeOf<E> = E extends { type: infer T } ? T : never;

// Helper: Get the event object by event type
type EventByType<
  Events extends readonly { type: string }[],
  T extends string,
> = Extract<Events[number], { type: T }>;

// Helper: Infer the payload type for a given event type
type PayloadOf<Events extends readonly { type: string }[], T extends string> =
  EventByType<Events, T> extends { payloadSchema: ZodType }
    ? z.infer<EventByType<Events, T>["payloadSchema"]>
    : never;

// Component type: param is the tuple of events
type Component<Events extends readonly { type: string }[], S extends State> = {
  events: Events;
  initialState: S;
};

function createDispatchers<
  Events extends readonly { type: string }[],
  S extends State,
>(
  component: Component<Events, S>,
  stateContainer: { state: S },
  eventLogs: string[],
): {
  [K in EventTypeOf<Events> & string]: (payload: PayloadOf<Events, K>) => void;
} {
  const dispatchers = {} as any;
  for (const ev of component.events) {
    dispatchers[ev.type] = (payload: any) => {
      // @ts-ignore - type safety is guaranteed by construction
      stateContainer.state = ev.reducer(stateContainer.state, payload);
      eventLogs.push(ev.type);
    };
  }
  return dispatchers;
}

// Example Usage

const clickSchema = z.object({ x: z.number(), y: z.number() });
const submitSchema = z.object({ value: z.string() });

const initialState = { count: 0 };
type ComponentState = typeof initialState;

const clickEvent: Event<"click", typeof clickSchema, ComponentState> = {
  type: "click",
  payloadSchema: clickSchema,
  reducer: (state, payload) => ({
    count: state.count + payload.x + payload.y,
  }),
};

const submitEvent: Event<"submit", typeof submitSchema, ComponentState> = {
  type: "submit",
  payloadSchema: submitSchema,
  reducer: (state, payload) => ({
    count: state.count + parseInt(payload.value, 10),
  }),
};

const events = [clickEvent, submitEvent] as const;

const myComponent: Component<typeof events, ComponentState> = {
  initialState,
  events,
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

it("generally works", () => {
  expect(true).to.be.true;
});
