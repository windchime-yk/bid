import { writeFile } from "../deps.ts";
import { convertJsonToTsv } from "./convert.ts";
import type { CombineDictionaries } from "../model.ts";

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (data: string, path: string) => {
  await writeFile(data, path);
  outputBuildLog(path);
};

/** 単語のまとまりごとにユーザー辞書ファイルを生成 */
export const generateDictionaryFileByTypeForGoogleIme = async (
  basePath: string,
  combineDictionaries: CombineDictionaries,
) => {
  for (const dictionary in combineDictionaries) {
    const filepath = `${basePath}/googleime_${dictionary.toLowerCase()}.txt`;
    await generateDictionaryFile(
      convertJsonToTsv(combineDictionaries[dictionary]),
      filepath,
    );
  }
};
