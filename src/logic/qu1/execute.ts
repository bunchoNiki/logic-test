import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from './constants';

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
  const numberArray = hand.split('').map(char => parseInt(char));

  const counts: Record<number, number> = {};
  for (const num of numberArray) {
    counts[num] = (counts[num] || 0) + 1;
  }

  let hasFour = false;
  let hasThree = false;
  let pairCount = 0;

  for (const key in counts) {
    const count = counts[key];
    if (count === 4) {
      hasFour = true;
    }
    if (count === 3) {
      hasThree = true;
    }

    if (count >= 2) {
      pairCount++;
    }
  }
  
  if (pairCount === 1) {
    return ONE_PAIR;
  }
  if (pairCount === 2) {
    return TWO_PAIR;
  }
  if (hasThree && pairCount === 2) {
    return FULL_HOUSE;
  }
  if (hasThree) {
    return THREE_OF_A_KIND;
  }
  if (hasFour) {
    return FOUR_OF_A_KIND;
  }

  const sorted = [...numberArray].sort((a, b) => a - b);
  const isConsecutive = sorted[4] - sorted[0] === 4;

  if (isConsecutive) {
    return STRAIGHT;
  }

  return HIGH_CARD;
};

main('13535');
