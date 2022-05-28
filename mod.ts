import { ensureDir } from "./deps.ts";
import { convertJsonToCsv, convertJsonToTsv } from "./core/convert.ts";
import {
  generateDictionaryFile,
  generateDictionaryFileByTypeForGoogleIme,
} from "./core/build.ts";
import type {
  BuildDictionaryFileOptions,
  CombineDictionaries,
  Dictionaries,
} from "./model.ts";

/** 単語のまとまりを分解して一つの配列を形成 */
export const combineDictionary = (combineDictionaries: CombineDictionaries): Dictionaries => {
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
    await generateDictionaryFile(
      convertJsonToCsv(dictionaries),
      imeTxtPathList.kotoeri,
    );
  }
  if (imeTxtPathList.google) {
    await generateDictionaryFile(
      convertJsonToTsv(dictionaries),
      imeTxtPathList.google,
    );
  }
  if (combineDictionaries) {
    await generateDictionaryFileByTypeForGoogleIme(
      basePath,
      combineDictionaries,
    );
  }
};
