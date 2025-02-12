import { parseArgs } from "@std/cli";
import { join } from "@std/path";
import { ensureDir, walk } from "@std/fs";
import { compress } from "./core/compress.ts";
import { isValidFileExtention, isValidJson } from "./core/validation.ts";
import {
  convertJsonToTextData,
  parsedCsvToJson,
  readFile,
} from "./core/convert.ts";
import { generateDictionaryFile } from "./core/build.ts";
import { CliError } from "./core/error.ts";
import type { ImeType } from "./model.ts";

const args = parseArgs(Deno.args, {
  boolean: ["all", "google", "macos", "microsoft", "gboard", "compress"],
  string: ["dir"],
});

if (!args.dir) throw new CliError("--dirでディレクトリを指定してください");

for await (const dirEntry of walk(join(Deno.cwd(), args.dir))) {
  if (dirEntry.isFile) {
    const isValidFileExtentionResult = isValidFileExtention(dirEntry.name);

    if (!isValidFileExtentionResult.success) {
      throw isValidFileExtentionResult.error;
    }

    let data: Record<string, string | undefined>[] = [];

    switch (isValidFileExtentionResult.result) {
      case ".csv": {
        data = parsedCsvToJson(await readFile(dirEntry.path));
        break;
      }
      default:
        data = JSON.parse(await readFile(dirEntry.path)).dictionaries;
        break;
    }

    const isValidJsonResult = isValidJson(data);

    if (!isValidJsonResult.success) {
      throw isValidJsonResult.error;
    }

    let imeTypeList: ImeType[] = [];

    if (args.all) {
      imeTypeList = ["Google IME", "macOS IME", "Microsoft IME", "GBoard"];
    } else {
      if (args.google) imeTypeList.push("Google IME");
      if (args.macos) imeTypeList.push("macOS IME");
      if (args.microsoft) imeTypeList.push("Microsoft IME");
      if (args.gboard) imeTypeList.push("GBoard");
      if (imeTypeList.length === 0) {
        throw new CliError("--allや--googleなどでIMEを指定してください");
      }
    }

    const OUTPUT_FILE_PREFIX = dirEntry.name.split(".").at(0)!;
    const OUTPUT_BASE_DIR_NAME = "tsuduri_output";
    const OUTPUT_DIR_NAME = join(OUTPUT_BASE_DIR_NAME, OUTPUT_FILE_PREFIX);

    await ensureDir(OUTPUT_DIR_NAME);

    for await (const imeType of imeTypeList) {
      await generateDictionaryFile(
        convertJsonToTextData(isValidJsonResult.result, imeType),
        `${OUTPUT_DIR_NAME}/${OUTPUT_FILE_PREFIX}-${
          imeType.toLowerCase().replace(" ", "")
        }.txt`,
        imeType,
      );
    }
  }
}

if (args.compress) {
  await compress("tsuduri_output", "tsuduri_output_archive");
}
