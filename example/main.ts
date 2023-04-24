import { buildDictionaryFile, combineDictionary } from "../mod.ts";
import type {
  BuildDictionaryFileOptions,
  CombineDictionaries,
  Dictionaries,
} from "../model.ts";

const DEVELOPMENT: Dictionaries = [
  {
    type: "固有名詞",
    word: "Mastodon",
    reading: "ますとどん",
  },
  {
    type: "固有名詞",
    word: "nginx",
    reading: "えんじんえっくす",
  },
  {
    type: "固有名詞",
    word: "Visual Studio Code",
    reading: "ぶいえすこーど",
  },
  {
    type: "固有名詞",
    word: "VS Code",
    reading: "ぶいえすこーど",
  },
  {
    type: "固有名詞",
    word: "ECAMScript",
    reading: "えくますくりぷと",
  },
];

const KAOMOJI: Dictionaries = [
  {
    type: "顔文字",
    word: "✌(’ω’✌ )三✌(’ω’)✌三( ✌’ω’)✌",
    reading: "いえーい",
  },
  {
    type: "顔文字",
    word: "(°∀｡)y─┛~~",
    reading: "ういうい",
  },
  {
    type: "顔文字",
    word: "(๑´╹‸╹`๑)",
    reading: "うーん",
  },
  {
    type: "顔文字",
    word: "(`0言0´*)ｳﾞｪｱｱｱ",
    reading: "ゔぇあ",
  },
  {
    type: "顔文字",
    word: "(`0言0´*)ｳﾞｪｱｱｱ",
    reading: "ゔえあ",
  },
  {
    type: "顔文字",
    word: "三 ヾ(⌒(厂 ˙ω˙ )厂 ｳｪｰｲ",
    reading: "うぇーい",
  },
  {
    type: "顔文字",
    word: "＼( 'ω')／ｳｵｵｱｱｱｱｱｱｱｱｱｱｱｱｱｱｱｱｰｯｯｯｯｯｯｯｯ!!",
    reading: "うおあー",
  },
  {
    type: "顔文字",
    word: "_(:3」∠)_",
    reading: "うだぁ",
  },
  {
    type: "顔文字",
    word: "(‘､3_ヽ)_",
    reading: "うだぁ",
  },
  {
    type: "顔文字",
    word: "_('ω' _)⌒)_",
    reading: "うだぁ",
  },
  {
    type: "顔文字",
    word: "(´Д｀;)",
    reading: "うへぇ",
  },
  {
    type: "顔文字",
    word: "_(´ཀ`」 ∠)_",
    reading: "うぼあ",
  },
  {
    type: "顔文字",
    word: "▂▅▇█▓▒░('ω')░▒▓█▇▅▂うわあああああああ",
    reading: "うわああ",
  },
  {
    type: "顔文字",
    word: "٩( 'ω' )و",
    reading: "えいおー",
  },
  {
    type: "顔文字",
    word: "＼＼\\\\٩( 'ω' )و //／／",
    reading: "えいおー",
  },
  {
    type: "顔文字",
    word: "(^ω^ 三 ^ω^)",
    reading: "おっおっ",
  },
  {
    type: "顔文字",
    word: "(๑•̀ㅂ•́)و✧",
    reading: "きらっ",
  },
  {
    type: "顔文字",
    word: "Σ┌( ┐*_ロ_)┐",
    reading: "ぐきっ",
  },
  {
    type: "顔文字",
    word: "( ‘ᾥ’ )",
    reading: "くだち",
  },
  {
    type: "顔文字",
    word: "(゜ロ゜)",
    reading: "くわっ",
  },
  {
    type: "顔文字",
    word: "('ω')三( ε: )三(.ω.)三( :3 )三('ω')ｺﾞﾛｺﾞﾛ",
    reading: "ごろごろ",
  },
  {
    type: "顔文字",
    word: "_(:зゝ∠)_",
    reading: "しゃかにゅうめつじのぽーず",
  },
  {
    type: "顔文字",
    word: "(^ω^ 三 ^ω^)",
    reading: "しゅしゅしゅ",
  },
  {
    type: "顔文字",
    word: "=͟͟͞͞( 'ω' =͟͟͞͞( 'ω' =͟͟͞͞)=͟͟͞=͟͟͞͞( 'ω' =͟͟͞͞( 'ω' =͟͟͞͞)",
    reading: "しゅしゅしゅ",
  },
  {
    type: "顔文字",
    word: "(^q^)",
    reading: "じゅるり",
  },
  {
    type: "顔文字",
    word: "( ´･ω･)(´･ω･)(･ω･`)(･ω･` )【審議中】",
    reading: "しんぎちゅう",
  },
  {
    type: "顔文字",
    word: "( ˘ω˘)",
    reading: "すやぁ",
  },
  {
    type: "顔文字",
    word: "0(:3 )〜 _(:3｣ ∠ )_",
    reading: "ちーん",
  },
  {
    type: "顔文字",
    word: "ヾ(⌒(ﾉ'ω')ﾉ",
    reading: "とうっ",
  },
  {
    type: "顔文字",
    word: "(╹◡╹)",
    reading: "にこー",
  },
  {
    type: "顔文字",
    word: "( ･`ω･´)",
    reading: "にゅいっ",
  },
  {
    type: "顔文字",
    word: "٩( 'ω' )۶",
    reading: "ぬんっ",
  },
  {
    type: "顔文字",
    word: "(´･ωゞ)",
    reading: "ねむねむ",
  },
  {
    type: "顔文字",
    word: "('ω' )",
    reading: "のーん",
  },
  {
    type: "顔文字",
    word: "(_・ω・)_ ﾊﾞｧﾝ",
    reading: "ばぁん",
  },
  {
    type: "顔文字",
    word: "ヾ(:3ﾉｼヾ)ﾉｼ",
    reading: "ばたばた",
  },
  {
    type: "顔文字",
    word: "ヾ(⌒(ﾉｼ'ω')ﾉｼ",
    reading: "ばたばた",
  },
  {
    type: "顔文字",
    word: "((ง'ω')و三 ง'ω')ڡ≡)`Дﾟ);､;'.･”",
    reading: "びしゅっ",
  },
  {
    type: "顔文字",
    word: "・:*三(　　　　ε:)",
    reading: "びゅーん",
  },
  {
    type: "顔文字",
    word: "‹‹\\(´ω` )/››‹‹\\( ´)/››‹‹\\( ´ω`)/››",
    reading: "くるくる",
  },
  {
    type: "顔文字",
    word: "＼＼\\\\ꐕ ꐕ ꐕ//／／",
    reading: "わー",
  },
];

const dictionaryByType: CombineDictionaries = {
  KAOMOJI,
  DEVELOPMENT,
};

const dictionaryAll = combineDictionary(dictionaryByType);

const BASE_PATH = "./dist";
const options: BuildDictionaryFileOptions = {
  basePath: BASE_PATH,
  imeTxtPathList: {
    googleime: `${BASE_PATH}/googleime.txt`,
    kotoeri: `${BASE_PATH}/kotoeri.txt`,
    msime: `${BASE_PATH}/msime.txt`,
  },
  dictionaries: dictionaryAll,
  combineDictionaries: dictionaryByType,
};

try {
  buildDictionaryFile(options);
} catch (error: unknown) {
  console.error(error);
}
