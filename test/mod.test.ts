import { assertEquals } from "../deps.ts";
import { combineDictionary } from "../mod.ts";
import { testAllArray, testCombineArray } from "./mockdata.ts";

Deno.test("combineDictionary", () => {
  assertEquals(combineDictionary(testAllArray), testCombineArray);
});
