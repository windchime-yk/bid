import { ensureDir } from "./deps.ts";
import { convertJsonToCsv, convertJsonToTsv } from "./core/convert.ts";
import {
  detectEncoding,
  generateDictionaryFile,
  generateDictionaryFileByType,
} from "./core/build.ts";
import {
  BuildDictionaryFileOptions,
  CombineDictionaries,
  Dictionaries,
  IME_TYPE,
} from "./model.ts";

/** 単語のまとまりを分解して一つの配列を形成 */
export const combineDictionary = (
  combineDictionaries: CombineDictionaries,
): Dictionaries => {
  const dictionaries: Dictionaries = [];
  for (const dictionary in combineDictionaries) {
    dictionaries.push(...combineDictionaries[dictionary]);
  }
  return dictionaries;
};

/** 各IMEに合わせたユーザー辞書ファイルの作成 */
export const buildDictionaryFile = async (
  options: BuildDictionaryFileOptions,
): Promise<void> => {
  const { basePath, imeTxtPathList, dictionaries, combineDictionaries } =
    options;

  if (!dictionaries) return;

  await ensureDir(basePath);
  if (imeTxtPathList.kotoeri) {
    const { encode, bom } = detectEncoding(IME_TYPE.Apple);
    await generateDictionaryFile(
      convertJsonToCsv(dictionaries, IME_TYPE.Apple),
      imeTxtPathList.kotoeri,
      encode,
      bom,
    );
  }
  if (imeTxtPathList.googleime) {
    const { encode, bom } = detectEncoding(IME_TYPE.Google);
    await generateDictionaryFile(
      convertJsonToTsv(dictionaries, IME_TYPE.Google, { after: "\n" }),
      imeTxtPathList.googleime,
      encode,
      bom,
    );
  }
  if (imeTxtPathList.msime) {
    const { encode, bom } = detectEncoding(IME_TYPE.Microsoft);
    await generateDictionaryFile(
      convertJsonToTsv(dictionaries, IME_TYPE.Microsoft, { after: "\n" }),
      imeTxtPathList.msime,
      encode,
      bom,
    );
  }
  if (combineDictionaries) {
    await generateDictionaryFileByType(
      basePath,
      convertJsonToTsv,
      combineDictionaries,
      IME_TYPE.Google,
      { after: "\n" },
    );
    await generateDictionaryFileByType(
      basePath,
      convertJsonToCsv,
      combineDictionaries,
      IME_TYPE.Apple,
    );
    await generateDictionaryFileByType(
      basePath,
      convertJsonToTsv,
      combineDictionaries,
      IME_TYPE.Microsoft,
    );
  }
};
