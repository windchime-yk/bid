import { ensureDir } from "./deps.ts";
import { convertJsonToCsv, convertJsonToTsv } from "./util/convert.ts";
import {
  generateDictionaryFile,
  generateDictionaryFileByTypeForGoogleIme,
} from "./util/build.ts";
import type {
  BuildDictionaryFileOptions,
  CombineMap,
  Dictionaries,
} from "./model.ts";

export const combineDictionary = (combineMap: CombineMap): Dictionaries => {
  const dictionaries: Dictionaries = [];
  for (const dictionary in combineMap) {
    dictionaries.push(...combineMap[dictionary]);
  }
  return dictionaries;
};

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
