import { writeFile } from "../deps.ts";
import { convertJsonToTsv } from "./convert.ts";
import type { CombineDictionaries, IMEType, Insert } from "../model.ts";

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (data: string, path: string) => {
  await writeFile(data, path);
  outputBuildLog(path);
};

/** 単語のまとまりごとにユーザー辞書ファイルを生成 */
export const generateDictionaryFileByType = async (
  basePath: string,
  combineDictionaries: CombineDictionaries,
  imeType: IMEType,
  insert?: Insert,
) => {
  for (const dictionary in combineDictionaries) {
    const filepath = `${basePath}/${imeType}_${dictionary.toLowerCase()}.txt`;
    await generateDictionaryFile(
      convertJsonToTsv(combineDictionaries[dictionary], imeType, insert),
      filepath,
    );
  }
};
