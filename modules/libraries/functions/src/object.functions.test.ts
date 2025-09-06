import { describe, expect, test } from "vitest";
import { map } from "./object.functions.js";

describe("object functions", () => {
  test("object mapper", () => {
    //given
    const object1 = { key1: "value1" };
    const mapper = (value:string) => value + "-mapped";

    //when
    const actual = map(object1, mapper);

    //then
    expect(actual).toEqual({ key1: "value1-mapped" });
  });
});
