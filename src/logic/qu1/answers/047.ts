import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from '../constants';

const countDuplicatingNumber = (
  numberArray: number[]
): Record<number, number> => {
  const counts: Record<number, number> = {};
  for (const num of numberArray) {
    counts[num] = (counts[num] || 0) + 1;
  }
  return counts;
};

type DuplicatingKinds = {
  hasFour: number;
  hasThree: number;
  pairCount: number;
};

const checkDuplicatingKinds = (
  counts: Record<number, number>
): DuplicatingKinds => {
  const duplicating: DuplicatingKinds = {
    hasFour: 0,
    hasThree: 0,
    pairCount: 0,
  };

  for (const key in counts) {
    const count: number = counts[key];
    if (count === 4) {
      // 4カードの場合は他の役の可能性はないため、早期リターンでよい
      duplicating.hasFour++;
      return duplicating;
    }

    if (count === 3) {
      duplicating.hasThree++;
    }

    // 2以上だと後続の判定でペア役に吸われる可能性がある
    if (count === 2) {
      duplicating.pairCount++;
    }
  }

  return duplicating;
};

const judgeRole = (
  duplicatingKinds: DuplicatingKinds,
  numberArray: number[]
): string => {
  const { hasFour, hasThree, pairCount } = duplicatingKinds;
  // 役に必要なcountが多い役から判定
  if (hasFour) {
    return FOUR_OF_A_KIND;
  }
  if (hasThree) {
    // フルハウスの判定が先
    return pairCount ? FULL_HOUSE : THREE_OF_A_KIND;
  }
  if (pairCount) {
    return pairCount === 2 ? TWO_PAIR : ONE_PAIR;
  }

  const sorted: number[] = [...numberArray].sort((a, b) => a - b);
  //ペアがないかを確認しているためこの判定でよい
  const isConsecutive: boolean = sorted[4] - sorted[0] === 4;

  if (isConsecutive) {
    return STRAIGHT;
  }

  return HIGH_CARD;
};

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

  const numberArray: number[] = hand.split("").map((char) => parseInt(char));

  const counts: Record<number, number> = countDuplicatingNumber(numberArray);
  const duplicating: DuplicatingKinds = checkDuplicatingKinds(counts);
  const role: string = judgeRole(duplicating, numberArray);

  return role;
};

main("13535");