import { assertEquals } from "../deps.ts";
import { convertJsonToCsv, convertJsonToTsv } from "../core/convert.ts";
import { testCombineArray } from "./mockdata.ts";

Deno.test("convert JSON to CSV", () => {
  assertEquals(
    convertJsonToCsv(testCombineArray),
    "でぃくしょなりー,Dictionary,固有名詞\nわいけー,WhyK,人名",
  );
});

Deno.test("convert JSON to TSV", () => {
  assertEquals(
    convertJsonToTsv(testCombineArray),
    "でぃくしょなりー\tDictionary\t固有名詞\nわいけー\tWhyK\t人名",
  );
});
