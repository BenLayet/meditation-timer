import { z, ZodType } from "zod";

// The State type can be anything (for simplicity)
type State = Record<string, any>;

// This generic infers the correct reducer signature for each event
type Event<S extends State, Schemas extends Record<string, ZodType>> = {
  [K in keyof Schemas]: {
    payloadSchema: Schemas[K];
    reducer: (state: S, payload: z.infer<Schemas[K]>) => S;
  };
};

// The dispatcher type
type Dispatchers<
    S extends State,
    Schemas extends Record<string, ZodType>
> = {
  [K in keyof Schemas]: (payload: z.infer<Schemas[K]>) => void;
};

// Implementation of createDispatchers
function createDispatchers<
    S extends State,
    Schemas extends Record<string, ZodType>
>(
    component: {
      initialState: S;
      events: Event<S, Schemas>;
    },
    stateContainer: { state: S }
): Dispatchers<S, Schemas> {
  const dispatchers = {} as Dispatchers<S, Schemas>;
  for (const eventName in component.events) {
    dispatchers[eventName as keyof Schemas] = (payload: any) => {
      const event = component.events[eventName as keyof Schemas];
      stateContainer.state = event.reducer(stateContainer.state, payload);
    };
  }
  return dispatchers;
}

// Example Usage

const myState = { count: 0 };
type MyState = typeof myState;

const clickedPayloadSchema = z.object({ x: z.number(), y: z.number() });
const submittedPayloadSchema = z.object({ value: z.string() });

const clicked:Event<typeof myState, typeof clickedPayloadSchema> = {
  payloadSchema: clickedPayloadSchema,
  reducer: (state, payload) => ({
    count: state.count + payload.x + payload.y,
  }),
};
const myEvents: Event<
    MyState,
    {
      clicked: ;
      submitted: typeof submittedPayloadSchema;
    }
> = {
  clicked:  clicked,
  submitted: {
    payloadSchema: submittedPayloadSchema,
    reducer: (state, payload) => ({
      count: state.count + parseInt(payload.value, 10),
    }),
  },
};

const myComponent = {
  initialState: myState,
  events: myEvents,
};

const stateContainer = { state: myComponent.initialState };
const myDispatchers = createDispatchers(myComponent, stateContainer);

// These are now strongly typed:
myDispatchers.clicked({ x: 1, y: 2 }); // OK
myDispatchers.submitted({ value: "100" }); // OK

// Uncommenting the following lines will cause type errors:
// myDispatchers.clicked({ value: "oops" });
// myDispatchers.submitted({ x: 1, y: 2 });