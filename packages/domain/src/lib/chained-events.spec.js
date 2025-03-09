import {describe, expect, test} from 'vitest';
import {createChainedEventFactories} from "./chained-events.js";
import ow from "ow";

const eventOneOccurred = {key1: ow.string};
const eventTwoOccurred = {key1: ow.string};
const eventThreeOccurred = {key1: ow.string, key2: ow.string};
const simpleEventChain = {
    onEvent: eventOneOccurred,
    thenDispatch: eventTwoOccurred
}
const eventChainWithPayload = {
    onEvent: eventOneOccurred,
    thenDispatch: eventThreeOccurred,
    withPayload: (previousPayload, state) => ({...previousPayload, key2: 'constructed', key3: state.property1})
}

describe('createAllComponentEvents', () => {
    test('simple event chain: when event one occurs, event two with same payload should be created', () => {
        //given
        const component = {chainedEvents: [simpleEventChain]};
        const previousEvent = {eventType: eventOneOccurred, payload: {key1: 'value1'}};
        const state = {};
        const chainedEventsFactory = createChainedEventFactories(component);

        //when
        const chainedEvents = chainedEventsFactory(previousEvent, state);

        //then
        expect(chainedEvents).toEqual([{eventType: eventTwoOccurred, payload: {key1: 'value1'}}]);
    });
    test('event chain with payload: when event one occurs, event three with constructed payload should be created', () => {
        //given
        const component = {chainedEvents: [eventChainWithPayload]}
        const previousEvent = {eventType: eventOneOccurred, payload: {key1: 'value1'}};
        const state = {property1: 'stateProperty1'};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: eventThreeOccurred,
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'}
        }]);
    });
    test('sub-component with chain with payload: when event one occurs, sub-components should dispatch event three with constructed payload based on sub state', () => {
        //given
        const subComponent = {chainedEvents: [eventChainWithPayload]};
        const component = {subComponents: {subComponent1: subComponent}};

        const previousEvent = {eventType: eventOneOccurred, payload: {key1: 'value1'}};
        const state = {subComponent1: {property1: 'stateProperty1'}};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: eventThreeOccurred,
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'}
        }]);

    });

    test('sub-component of sub-component: when event one occurs, deep sub-components should dispatch event three with constructed payload based on sub state', () => {
        //given
        const subComponent2 = {chainedEvents: [eventChainWithPayload]};
        const subComponent1 = {subComponents: {subComponent2}};
        const component = {subComponents: {subComponent1}};
        const previousEvent = {eventType: eventOneOccurred, payload: {key1: 'value1'}};
        const state = {subComponent1: {subComponent2: {property1: 'stateProperty1'}}};
        const eventChain = createChainedEventFactories(component);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([{
            eventType: eventThreeOccurred,
            payload: {key1: 'value1', key2: 'constructed', key3: 'stateProperty1'}
        }]);

    })
});