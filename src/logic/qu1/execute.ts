import {
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  HIGH_CARD,
  ONE_PAIR,
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
} from "./constants";

/**
 *
 * @param {string} hand 役を判定すべき手札
 * @returns {string} 役名.
 */
export const main = (hand: string): string => {
  // 入力フォーマットに適してないやつは潰す役なしで早期リターンする
  if (!/^[1-9]{5}$/.test(hand)) {
    return HIGH_CARD;
  }
  const numberArray = hand.split("").map((char) => parseInt(char));

  const counts: Record<number, number> = {};
  for (const num of numberArray) {
    counts[num] = (counts[num] || 0) + 1;
  }

  let hasThree = false;
  let pairCount = 0;

  for (const key in counts) {
    const count = counts[key];
    if (count === 4) {
      // 4カードの場合は他の役の可能性はないため、早期リターンでよい
      return FOUR_OF_A_KIND;
    }

    if (count === 3) {
      hasThree = true;
    }

    // 2以上だと後続の判定でペア役に吸われる可能性がある
    if (count === 2) {
      pairCount++;
    }
  }

  // 役に必要なcountが多い役から判定
  if (hasThree) {
    // フルハウスの判定が先
    return pairCount === 1 ? FULL_HOUSE : THREE_OF_A_KIND;
  }
  if (pairCount === 2) {
    return TWO_PAIR;
  }
  if (pairCount === 1) {
    return ONE_PAIR;
  }

  const sorted = [...numberArray].sort((a, b) => a - b);
  //ペアがないかを確認しているためこの判定でよい
  const isConsecutive = sorted[4] - sorted[0] === 4;

  if (isConsecutive) {
    return STRAIGHT;
  }

  return HIGH_CARD;
};

main("13535");
