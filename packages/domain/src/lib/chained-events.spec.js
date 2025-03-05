import {describe, expect, test} from 'vitest';
import {createEventFactory} from "./event-factory.js";
import {createChainedEventFactories} from "./chained-events.js";

const eventOneOccurred = createEventFactory('eventOneOccurred', ({key1}) => ({key1}));
const eventTwoOccurred = createEventFactory('eventTwoOccurred', ({key1}) => ({key1}));
const eventThreeOccurred = createEventFactory('eventThreeOccurred', ({key1, key2}) => ({key1, key2}));
const simpleEventChain = {
    onEvent: eventOneOccurred,
    thenDispatch: eventTwoOccurred
}
const eventChainWithPayload = {
    onEvent: eventOneOccurred,
    thenDispatch: eventThreeOccurred,
    withPayload: (previousPayload, state) => ({...previousPayload, key2: 'constructed', key3: state.property1})
}

describe('createAllFeatureEvents', () => {
    test('simple event chain: when event one occurs, event two with same payload should be created', () => {
        //given
        const feature = {chainedEvents: [simpleEventChain]};
        const previousEvent = eventOneOccurred({key1: 'value1'});
        const state = {};
        const chainedEventsFactory = createChainedEventFactories(feature);

        //when
        const chainedEvents = chainedEventsFactory(previousEvent, state);

        //then
        expect(chainedEvents).toEqual([eventTwoOccurred({key1: 'value1'})]);
    });
    test('event chain with payload: when event one occurs, event three with constructed payload should be created', () => {
        //given
        const feature = {chainedEvents: [eventChainWithPayload]}
        const previousEvent = eventOneOccurred({key1: 'value1'});
        const state = {property1: 'stateProperty1'};
        const eventChain = createChainedEventFactories(feature);

        //when
        const propagated = eventChain(previousEvent, state);

        //then
        expect(propagated).toEqual([eventThreeOccurred({key1: 'value1', key2: 'constructed', key3: 'stateProperty1'})]);
    });
    test('sub-feature with chain with payload: when event one occurs, sub-features should dispatch event three with constructed payload based on sub state', () => {
        //given
        const subFeature = {chainedEvents: [eventChainWithPayload]};
        const feature = {features: {subFeature1: subFeature}};

        const previousEvent = eventOneOccurred({key1: 'value1'});
        const state = {subFeature1: {property1: 'stateProperty1'}};
        const eventChain = createChainedEventFactories(feature);

        //when
        const propagated = eventChain(previousEvent, state);

        //then
        expect(propagated).toEqual([eventThreeOccurred({key1: 'value1', key2: 'constructed', key3: 'stateProperty1'})]);

    });

    test('sub-feature of sub-feature: when event one occurs, deep sub-features should dispatch event three with constructed payload based on sub state', () => {
        //given
        const subFeature2 = {chainedEvents: [eventChainWithPayload]};
        const subFeature1 = {features: {subFeature2}};
        const feature = {features: {subFeature1}};

        const previousEvent = eventOneOccurred({key1: 'value1'});
        const state = {subFeature1: {subFeature2: {property1: 'stateProperty1'}}};
        const eventChain = createChainedEventFactories(feature);

        //when
        const newEvents = eventChain(previousEvent, state);

        //then
        expect(newEvents).toEqual([eventThreeOccurred({key1: 'value1', key2: 'constructed', key3: 'stateProperty1'})]);

    })
});