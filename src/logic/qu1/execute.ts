import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from "./constants";


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
  const counts: Record<number, number> = {};

  for (const digit of arr) {
    counts[digit] = (counts[digit] || 0) + 1;
  }

  const countValues = Object.values(counts).sort((a, b) => b - a);

  if (countValues[0] === 4) {
    return FOUR_OF_A_KIND;
  }

  if (countValues[0] === 3 && countValues[1] === 2) {
    return FULL_HOUSE;
  }

  let isStraight = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      isStraight = false;
      break;
    }
  }

  if (isStraight) {
    return STRAIGHT;
  }

  if (countValues[0] === 3) {
    return THREE_OF_A_KIND;
  }

  if (countValues[0] === 2 && countValues[1] === 2) {
    return TWO_PAIR;
  }

  if (countValues[0] === 2) {
    return ONE_PAIR;
  }

  return HIGH_CARD;
};
main('13535');