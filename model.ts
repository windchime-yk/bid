import { COMMA, TAB } from "./core/config.ts";

type DictionaryType =
  | "顔文字"
  | "記号"
  | "名詞"
  | "固有名詞"
  | "人名"
  | "姓"
  | "名"
  | "組織"
  | "地名"
  | "短縮よみ";

export interface Dictionary {
  type: DictionaryType;
  word: string;
  reading: string;
}

export type Dictionaries = Dictionary[];

export interface CombineMap {
  [key: string]: Dictionaries;
}

export type Insert = typeof TAB | typeof COMMA;

export interface BuildDictionaryFileOptions {
  basePath: string;
  imeTxtPathList: {
    google?: string;
    kotoeri?: string;
  };
  dictionaries?: Dictionaries;
  combineDictionaries?: CombineMap;
}
