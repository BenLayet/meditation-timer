import {describe, expect, test} from 'vitest';
import {createChainedEventFactories} from "./chained-events.js";
import ow from "ow";

const events = {
    eventOneOccurred: {
        eventType: "eventOneOccurred",
        payloadShape: {key1: ow.string},
    },
    eventTwoOccurred: {
        eventType: "eventTwoOccurred",
        payloadShape: {key1: ow.string},
    },
    eventThreeOccurred: {
        eventType: "eventThreeOccurred",
        payloadShape: {key1: ow.string, key2: ow.string, key3: ow.string},
    },
};

const simpleEventChain = {
    onEvent: events.eventOneOccurred,
    thenDispatch: events.eventTwoOccurred,
}
const eventChainWithPayload = {
    onEvent: events.eventOneOccurred,
    thenDispatch: events.eventThreeOccurred,
    withPayload: ({previousPayload, state}) => ({
        ...previousPayload,
        key2: 'constructed',
        key3: state.ownState.property1
    })
}
const eventChainToChild = {
    onEvent: events.eventOneOccurred,
    thenDispatch: {
        ...dispatchers.eventTwoOccurred,
        childComponentPath: ["child1"]
    },
}
const eventChainFromChild = {
    onEvent: {
        ...dispatchers.eventOneOccurred,
        childComponentPath: ["child1"]
    },
    thenDispatch: events.eventTwoOccurred
}
const eventChainFromChild1ToChild2 = {
    onEvent: {
        ...dispatchers.eventOneOccurred,
        childComponentPath: ["child1"]
    },
    thenDispatch: {
        ...dispatchers.eventTwoOccurred,
        childComponentPath: ["child2"]
    },
}


describe('createAllComponentEvents', () => {
    test('simple event chain: when event one occurs, event two with same payload should be created', () => {
        //given
        const component = {chainedEvents: [simpleEventChain]};
        const previousEvent = {componentPath: [], eventType: "eventOneOccurred", payload: {key1: 'value1'}};
        const state = {};
        const chainedEventsFactory = createChainedEventFactories(component);

        //when
        const chainedEvents = chainedEventsFactory(previousEvent, state);

        //then
        expect(chainedEvents).toEqual([
            {
                eventType: "eventTwoOccurred",
                payload: {key1: 'value1'},
                componentPath: []
            }]);
    });
    test('event chain with payload: when event one occurs, event three with constructed payload should be created', () => {
        //given
        const component = {chainedEvents: [eventChainWithPayload]}
        const previousEvent = {componentPath: [], eventType: "eventOneOccurred", payload: {key1: 'value1'}};
        const state = {ownState: {property1: 'stateProperty1'}};

        //when
        const newEvents = createChainedEventFactories(component)(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventThreeOccurred",
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'},
            componentPath: []
        }]);
    });
    test('child-component with chain with payload: when event one occurs, sub-components should dispatch event three with constructed payload based on sub state', () => {
        //given
        const child1 = {chainedEvents: [eventChainWithPayload]};
        const component = {children: {child1}};
        const previousEvent = {componentPath: ["child1"], eventType: "eventOneOccurred", payload: {key1: 'value1'}};
        const child1State = {ownState: {property1: 'stateProperty1'}};
        const state = {children: {child1: child1State}};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventThreeOccurred",
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'},
            componentPath: ["child1"]
        }]);

    });

    test('grand-child-component: when event one occurs, grand-child-components should dispatch event three with constructed payload based on child state', () => {
        //given
        const child2 = {chainedEvents: [eventChainWithPayload]};
        const child1 = {children: {child2}};
        const component = {children: {child1}};
        const previousEvent = {
            componentPath: ["child1", "child2"],
            eventType: "eventOneOccurred",
            payload: {key1: 'value1'}
        };
        const child2State = {ownState: {property1: 'stateProperty1'}};
        const child1State = {children: {child2: child2State}};
        const state = {children: {child1: child1State}};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventThreeOccurred",
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'},
            componentPath: ["child1", "child2"]
        }]);

    });

    test('dispatch to child', () => {
        //given
        const component = {chainedEvents: [eventChainToChild]};
        const previousEvent = {
            componentPath: [],
            eventType: "eventOneOccurred",
            payload: {key1: 'value1'}
        };
        const state = {};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventTwoOccurred",
            payload: {key1: 'value1'},
            componentPath: ["child1"]
        }]);

    });


    test('dispatch from child', () => {
        //given
        const component = {chainedEvents: [eventChainFromChild]};
        const previousEvent = {
            componentPath: ["child1"],
            eventType: "eventOneOccurred",
            payload: {key1: 'value1'}
        };
        const state = {};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventTwoOccurred",
            payload: {key1: 'value1'},
            componentPath: []
        }]);

    });
    test('dispatch from child1 to child2', () => {
        //given
        const component = {chainedEvents: [eventChainFromChild1ToChild2]};
        const previousEvent = {
            componentPath: ["child1"],
            eventType: "eventOneOccurred",
            payload: {key1: 'value1'}
        };
        const state = {};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: "eventTwoOccurred",
            payload: {key1: 'value1'},
            componentPath: ["child2"]
        }]);

    });
});