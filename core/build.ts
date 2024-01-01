import { Buffer, compress } from "../deps.ts";
import { imeConfig } from "./config.ts";
import type { ImeType } from "../model.ts";

/**
 * 非同期でユーザー辞書ファイルを作成する
 * @param rawdata ファイルに書き込まれるユーザー辞書データ
 * @param filepath ファイル名
 * @param imeType 対象IME
 */
const writeFile = async (
  rawdata: string,
  filePath: string,
  imeType: ImeType,
): Promise<void> => {
  const { encoding, bom } = imeConfig[imeType];
  const bomString = bom ? `\ufeff${rawdata}` : rawdata;
  const data = Buffer.from(bomString, encoding);
  await Deno.writeFile(filePath, data);
};

/**
 * 非同期でファイルを圧縮する
 * @param filePath 圧縮対象
 * @param archivePath 圧縮後の保存先
 */
export const compressFile = async (
  filePath: string,
  archivePath: string,
): Promise<void> => {
  await compress(filePath, archivePath);
};

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (
  data: string,
  path: string,
  imeType: ImeType,
) => {
  await writeFile(data, path, imeType);
  outputBuildLog(path);
};
