import { describe, expect, test } from "vitest";
import { getVM } from "./view-model.js";
import ow from "ow";
describe("view model functions", () => {
    test("get view model: own selector", () => {
        //given
        const ownState = { key1: "value1" };
        const selector1 = (compositeState) => compositeState.ownState.key1;
        const component = { selectors: { selector1 } };
        const state = { ownState };
        //when
        const actual = getVM(component, state, () => { });
        const value1 = actual.selectors.selector1();
        //then
        expect(value1).toEqual("value1");
    });
    test("get view model: own event", () => {
        //given
        const dispatched = [];
        const dispatch = (event) => dispatched.push(event);
        const component = {
            events: {
                eventOneOccurred: {
                    eventType: "eventOneOccurred",
                    payloadShape: {
                        prop1: ow.string,
                    },
                },
            },
        };
        //when
        const actual = getVM(component, {}, dispatch);
        actual.dispatchers.eventOneOccurred({ prop1: "value1" });
        //then
        expect(dispatched.length).toBe(1);
        expect(dispatched[0]).toEqual({
            componentPath: [],
            eventType: "eventOneOccurred",
            payload: { prop1: "value1" },
            isNewCycle: false,
        });
    });
    test("get view model: child selector", () => {
        //given
        const selector1 = (compositeState) => compositeState.ownState.key1;
        const ownState = { key1: "value1" };
        const child1 = { selectors: { selector1 } };
        const component = { children: { child1 } };
        const state = { children: { child1: { ownState } } };
        //when
        const actual = getVM(component, state);
        const childVM = actual.children.child1;
        const value1 = childVM.selectors.selector1();
        //then
        expect(value1).toEqual("value1");
    });
    test("get view model: child event", () => {
        //given
        const dispatched = [];
        const dispatch = (event) => dispatched.push(event);
        const child1 = {
            events: {
                eventOneOccurred: {
                    eventType: "eventOneOccurred",
                    payloadShape: {
                        prop1: ow.string,
                    },
                },
            },
        };
        const component = { children: { child1 } };
        //when
        const actual = getVM(component, {}, dispatch);
        const childVM = actual.children.child1;
        childVM.dispatchers.eventOneOccurred({ prop1: "value1" });
        //then
        expect(dispatched.length).toBe(1);
        expect(dispatched[0]).toEqual({
            componentPath: ["child1"],
            eventType: "eventOneOccurred",
            payload: { prop1: "value1" },
            isNewCycle: false,
        });
    });
    test("get view model: own event no payload", () => {
        //given
        const dispatched = [];
        const dispatch = (event) => dispatched.push(event);
        const component = {
            events: { eventOneOccurred: { eventType: "eventOneOccurred" } },
        };
        //when
        const actual = getVM(component, {}, dispatch);
        actual.dispatchers.eventOneOccurred();
        //then
        expect(dispatched.length).toBe(1);
        expect(dispatched[0]).toEqual({
            componentPath: [],
            eventType: "eventOneOccurred",
            payload: {},
            isNewCycle: false,
        });
    });
    test("get view model: with isNewCycle true", () => {
        //given
        const dispatched = [];
        const dispatch = (event) => dispatched.push(event);
        const component = {
            events: {
                eventOneOccurred: { eventType: "eventOneOccurred", isNewCycle: true },
            },
        };
        //when
        const actual = getVM(component, {}, dispatch);
        actual.dispatchers.eventOneOccurred();
        //then
        expect(dispatched.length).toBe(1);
        expect(dispatched[0]).toEqual({
            componentPath: [],
            eventType: "eventOneOccurred",
            payload: {},
            isNewCycle: true,
        });
    });
});
