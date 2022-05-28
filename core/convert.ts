import { COMMA, NEW_LINE, TAB } from "./config.ts";
import type { Dictionaries, Insert } from "../model.ts";

/** JSONデータに区切り文字を挟み込んでテキストデータに変換 */
const convertJsonToTextData = (dictionaries: Dictionaries, insert: Insert) => {
  const convert = dictionaries.map((dictionary) =>
    `${dictionary.reading}${insert}${dictionary.word}${insert}${dictionary.type}`
  ).join(NEW_LINE);
  return convert;
};

/** JSONをCSV（コンマで区切られた汎用型データ形式、ことえりで使用）のテキストデータに変換する */
export const convertJsonToCsv = (dictionaries: Dictionaries): string =>
  convertJsonToTextData(dictionaries, COMMA);

/** JSONをTSV（タブで区切られた汎用型データ形式、Google日本語入力で使用）のテキストデータに変換する */
export const convertJsonToTsv = (dictionaries: Dictionaries): string =>
  convertJsonToTextData(dictionaries, TAB);
