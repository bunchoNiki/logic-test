import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from './constants';

/**
 * 
 * @param {string} hand 役を判定すべき手札
 * @returns {string} 役名.
 */
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
