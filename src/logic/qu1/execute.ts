import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from "./constants";

const HAND_TYPE = {
  [4]: ONE_PAIR,
  [3]: TWO_PAIR,
  [2]: FULL_HOUSE,
};

const STRAIGHT_DIFF = 4;
const FST_INDEX = 0;
const LAST_INDEX = 4;

/**
 * 役を保持するobjectのキーかの判定.
 * @param num keyかもしれない数値
 * @returns boolean 
 */
const isHandTypeKeys = (num: number): num is keyof typeof HAND_TYPE => {
  return num in HAND_TYPE;
};

/**
  ストレート → 数字が連続している
  4カード   → 5枚中4枚同一の数字
  フルハウス → 3枚同一の数字、2枚同一の数字
  3カード   → 5枚中3枚同一の数字
  2ペア     → 5枚中2枚同一が2組
  1ペア     → 5枚中2枚同一
  役なし    → 上記以外
【例】
  13524→ストレート
  77775⇒4カード
  55666⇒フルハウス
  22295⇒3カード
  13355⇒2ペア
  13535→2ペア
  11346⇒1ペア
  14689⇒役なし
  上記のように数字を入力したら対応する役を返却するメソッドを作成
  【条件】
**/
export const main = (hand: string): string => {
  const arr = hand.split('').map(Number).sort();
  const set = new Set(arr);

  if (/(\d)\1{3}/.test(arr.join(''))) {
    return FOUR_OF_A_KIND;
  }

  if (set.size === 3 && /(\d)\1{2}/.test(arr.join(''))) {
    return THREE_OF_A_KIND;
  }

  if (set.size === 5 && arr[LAST_INDEX] - arr[FST_INDEX] === STRAIGHT_DIFF) {
    return STRAIGHT;
  }

  if (isHandTypeKeys(set.size)) {
    return HAND_TYPE[set.size];  
  }

  return HIGH_CARD;
};


main('13535');
