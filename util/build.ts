import { writeFile } from "../deps.ts";
import { convertJsonToTsv } from "./convert.ts";
import type { CombineMap } from "../model.ts";

const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

export const generateDictionaryFile = async (data: string, path: string) => {
  await writeFile(data, path);
  outputBuildLog(path);
};

export const generateDictionaryFileByTypeForGoogleIme = async (
  basePath: string,
  combineMap: CombineMap,
) => {
  for (const dictionary in combineMap) {
    const filepath = `${basePath}/googleime_${dictionary.toLowerCase()}.txt`;
    await generateDictionaryFile(
      convertJsonToTsv(combineMap[dictionary]),
      filepath,
    );
  }
};
