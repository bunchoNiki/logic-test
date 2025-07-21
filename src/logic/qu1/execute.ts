import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from "./constants";

const HAND_TYPE: Record<number, string> = {
  [5]: HIGH_CARD,
  [4]: ONE_PAIR,
  [3]: TWO_PAIR,
  [2]: FULL_HOUSE,
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
  if (/(\d)\1{3}/.test(hand)) {
    return FOUR_OF_A_KIND;
  }

  const arr = hand.split('').map(Number).sort();
  const set = new Set(arr);

  if (set.size === 3 && /(\d)\1{2}/.test(hand)) {
    return THREE_OF_A_KIND;
  }

  if (set.size === 5 && arr[0] * 5 + 10 === arr.reduce((n, h) => n + h, 0)) {
    return STRAIGHT;
  }

  return HAND_TYPE[set.size];
};


main('13535');