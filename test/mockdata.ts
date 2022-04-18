import type { CombineMap, Dictionaries } from "../model.ts";

const testArray: Dictionaries = [
  {
    type: "固有名詞",
    word: "Dictionary",
    reading: "でぃくしょなりー",
  },
];
const test2Array: Dictionaries = [
  {
    type: "人名",
    word: "WhyK",
    reading: "わいけー",
  },
];
export const testAllArray: CombineMap = {
  testArray,
  test2Array,
};
export const testCombineArray: Dictionaries = [
  ...testArray,
  ...test2Array,
];
