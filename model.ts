import { COMMA, TAB } from "./core/config.ts";

export type Encoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

export enum IME_TYPE {
  Google = "googleime",
  Apple = "kotoeri",
  Microsoft = "msime",
}

export interface Insert {
  before?: string;
  after?: string;
}

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

export interface CombineDictionaries {
  [key: string]: Dictionaries;
}

export type Delimiter = typeof TAB | typeof COMMA;

export interface BuildDictionaryFileOptions {
  basePath: string;
  imeTxtPathList: {
    googleime?: string;
    kotoeri?: string;
    msime?: string;
  };
  dictionaries?: Dictionaries;
  combineDictionaries?: CombineDictionaries;
}
