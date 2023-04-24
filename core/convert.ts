import { COMMA, NEW_LINE, TAB } from "./config.ts";
import {
  Delimiter,
  Dictionaries,
  Dictionary,
  IME_TYPE,
  Insert,
} from "../model.ts";

/** IMEごとに必要な単語情報の絞り込みと順番整理を行なう */
const orderdDictionary = (
  dictionary: Dictionary,
  imeType: IME_TYPE,
): Dictionary => {
  const { type, word, reading } = dictionary;
  if (imeType === IME_TYPE.Google) {
    return {
      reading,
      word,
      type,
    };
  }
  if (imeType === IME_TYPE.Apple) {
    return {
      reading,
      word,
      type,
    };
  }
  return dictionary;
};

/** 単語情報に区切り文字を挟み込む */
export const insertDelimiter = (
  dictionary: Dictionary,
  delimiter: Delimiter,
): string[] => {
  const wordList: string[] = [];
  for (const key in dictionary) {
    wordList.push(dictionary[key as keyof Dictionary]);
    wordList.push(delimiter);
  }
  wordList.pop();
  return wordList;
};

/** 単語情報に区切り文字を挟み込んでテキストデータに変換 */
const convertJsonToTextData = (
  dictionaries: Dictionaries,
  delimiter: Delimiter,
  imeType: IME_TYPE,
  insert?: Insert,
) => {
  const convert = dictionaries.map((dictionary) => {
    const orderd = orderdDictionary(dictionary, imeType);
    return insertDelimiter(orderd, delimiter).join("");
  }).join(NEW_LINE);
  return `${insert?.before || ""}${convert}${insert?.after || ""}`;
};

/** JSONをCSV（コンマで区切られた汎用型データ形式、ことえりで使用）のテキストデータに変換する */
export const convertJsonToCsv = (
  dictionaries: Dictionaries,
  imeType: IME_TYPE,
  insert?: Insert,
): string => convertJsonToTextData(dictionaries, COMMA, imeType, insert);

/** JSONをTSV（タブで区切られた汎用型データ形式、Google日本語入力で使用）のテキストデータに変換する */
export const convertJsonToTsv = (
  dictionaries: Dictionaries,
  imeType: IME_TYPE,
  insert?: Insert,
): string => convertJsonToTextData(dictionaries, TAB, imeType, insert);
