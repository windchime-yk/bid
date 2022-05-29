import { writeFile } from "../deps.ts";
import type {
  CombineDictionaries,
  Dictionaries,
  IMEType,
  Insert,
} from "../model.ts";

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (
  data: string,
  path: string,
  encode: "UTF8" | "UTF16" | "UTF16BE" | "UTF16LE" | "EUCJP" | "JIS" | "SJIS" =
    "UTF8",
  bom: "LE" | boolean = false,
) => {
  await writeFile(data, path, encode, bom);
  outputBuildLog(path);
};

/** 単語のまとまりごとにユーザー辞書ファイルを生成 */
export const generateDictionaryFileByType = async (
  basePath: string,
  converter: (
    dictionaries: Dictionaries,
    imeType: IMEType,
    insert?: Insert,
  ) => string,
  combineDictionaries: CombineDictionaries,
  imeType: IMEType,
  insert?: Insert,
  encode: "UTF8" | "UTF16" | "UTF16BE" | "UTF16LE" | "EUCJP" | "JIS" | "SJIS" =
    "UTF8",
  bom: "LE" | boolean = false,
) => {
  for (const dictionary in combineDictionaries) {
    const filepath = `${basePath}/${imeType}_${dictionary.toLowerCase()}.txt`;
    await generateDictionaryFile(
      converter(combineDictionaries[dictionary], imeType, insert),
      filepath,
      encode,
      bom,
    );
  }
};
