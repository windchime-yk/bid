// NOTE: quicktypeの生成のためにmodel.tsのInputUserDictionaryを複製している
type YesOrNo = "YES" | "NO";
type Wordclass =
  | "普通名詞"
  | "固有名詞"
  | "サ変名詞"
  | "ザ変名詞"
  | "形容詞"
  | "形動名詞"
  | "副詞"
  | "連体詞"
  | "接続詞"
  | "感動詞"
  | "カ行五段動詞"
  | "ガ行五段動詞"
  | "サ行五段動詞"
  | "タ行五段動詞"
  | "ナ行五段動詞"
  | "バ行五段動詞"
  | "マ行五段動詞"
  | "ラ行五段動詞"
  | "ワ行五段動詞"
  | "一段動詞"
  | "短縮よみ"
  | "人名"
  | "人名接頭語"
  | "人名接尾語"
  | "姓"
  | "名"
  | "組織名"
  | "組織名接頭語"
  | "組織名接尾語"
  | "地名"
  | "地名接頭語"
  | "地名接尾語"
  | "数字接頭語"
  | "数字接尾語"
  | "記号"
  | "顔文字"
  | "慣用句";
type InputUserDictionary = {
  /** 品詞 */
  type: Wordclass;
  /** 対象文言 */
  word: string;
  /** 読み方 */
  reading: string;
  /** 抑制単語かどうか */
  isSuppress: YesOrNo;
  /** サジェストのみに表示するかどうか */
  isSuggest: YesOrNo;
  /** 対象文言についての説明 */
  description: string;
};

export type Schema = {
  dictionaries: InputUserDictionary[];
};
