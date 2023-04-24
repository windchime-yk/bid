import { Buffer } from "../deps.ts";
import {
  CombineDictionaries,
  Dictionaries,
  Encoding,
  IME_TYPE,
  Insert,
} from "../model.ts";

/** 非同期にファイル作成を行なう */
export const writeFile = async (
  rawdata: string,
  file: string,
  encode: Encoding,
  bom: boolean,
): Promise<void> => {
  const bomString = bom ? `\ufeff${rawdata}` : rawdata;
  const data = Buffer.from(bomString, encode);
  await Deno.writeFile(file, data);
};

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (
  data: string,
  path: string,
  encode: Encoding,
  bom: boolean,
) => {
  await writeFile(data, path, encode, bom);
  outputBuildLog(path);
};

export const detectEncoding = (
  imeType: IME_TYPE,
): { encode: Encoding; bom: boolean } => {
  switch (imeType) {
    case IME_TYPE.Microsoft:
      return { encode: "utf16le", bom: true };
    default:
      return { encode: "utf8", bom: false };
  }
};

/** 単語のまとまりごとにユーザー辞書ファイルを生成 */
export const generateDictionaryFileByType = async (
  basePath: string,
  converter: (
    dictionaries: Dictionaries,
    imeType: IME_TYPE,
    insert?: Insert,
  ) => string,
  combineDictionaries: CombineDictionaries,
  imeType: IME_TYPE,
  insert?: Insert,
) => {
  for (const dictionary in combineDictionaries) {
    const filepath = `${basePath}/${imeType}_${dictionary.toLowerCase()}.txt`;
    const { encode, bom } = detectEncoding(imeType);
    await generateDictionaryFile(
      converter(combineDictionaries[dictionary], imeType, insert),
      filepath,
      encode,
      bom,
    );
  }
};
