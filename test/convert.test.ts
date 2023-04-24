import { assertEquals } from "../deps.ts";
import { convertJsonToCsv, convertJsonToTsv } from "../core/convert.ts";
import { testCombineArray } from "./mockdata.ts";
import { IME_TYPE } from "../model.ts";

Deno.test("convert JSON to CSV", () => {
  assertEquals(
    convertJsonToCsv(testCombineArray, IME_TYPE.Google),
    "でぃくしょなりー,Dictionary,固有名詞\nわいけー,WhyK,人名",
  );
});

Deno.test("convert JSON to CSV(insert before)", () => {
  assertEquals(
    convertJsonToCsv(testCombineArray, IME_TYPE.Google, { before: "\n" }),
    "\nでぃくしょなりー,Dictionary,固有名詞\nわいけー,WhyK,人名",
  );
});

Deno.test("convert JSON to CSV(insert after)", () => {
  assertEquals(
    convertJsonToCsv(testCombineArray, IME_TYPE.Google, { after: "\n" }),
    "でぃくしょなりー,Dictionary,固有名詞\nわいけー,WhyK,人名\n",
  );
});

Deno.test("convert JSON to TSV", () => {
  assertEquals(
    convertJsonToTsv(testCombineArray, IME_TYPE.Google),
    "でぃくしょなりー\tDictionary\t固有名詞\nわいけー\tWhyK\t人名",
  );
});

Deno.test("convert JSON to TSV(insert before)", () => {
  assertEquals(
    convertJsonToTsv(testCombineArray, IME_TYPE.Google, { before: "\n" }),
    "\nでぃくしょなりー\tDictionary\t固有名詞\nわいけー\tWhyK\t人名",
  );
});

Deno.test("convert JSON to TSV(insert after)", () => {
  assertEquals(
    convertJsonToTsv(testCombineArray, IME_TYPE.Google, { after: "\n" }),
    "でぃくしょなりー\tDictionary\t固有名詞\nわいけー\tWhyK\t人名\n",
  );
});
