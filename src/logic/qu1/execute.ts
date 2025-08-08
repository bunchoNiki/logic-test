import { FIRST_INDEX, FOUR_OF_A_KIND, FULL_HOUSE, COUNT_OF_FOUR, HIGH_CARD, INPUT_ERROR, ONE_PAIR, COUNT_OF_ONE, STRAIGHT, STRAIGHT_DIFFERENCE, THREE_OF_A_KIND, COUNT_OF_THREE, TWO_PAIR, COUNT_OF_TWO, VALIDATION_CHECK_REG_EXP } from "./constants";
import { CardCount } from "./types";

/**
 * 昇順に並び変えた手札(数字)の隣合う各要素の差分が1であるかをもってストレート判定する。
 * @param {number[]} sortedHandArray 手札（昇順）
 * @returns {boolean} ストレート判定結果
 */
const isStraight = (sortedHandArray: number[]): boolean => {
  return sortedHandArray.every((cardNumber, index) => {
    if (index === FIRST_INDEX) {
      return true;
    }
    return cardNumber - sortedHandArray[index - 1] === STRAIGHT_DIFFERENCE;
  });
};

/**
 * 手札から各数字の枚数情報を形成する。
 * @param {number[]} sortedHandArray 手札（昇順）
 * @returns {CardCount[]} 各数字の枚数情報
 */
const getCardCounts = (sortedHandArray: number[]): CardCount[] => {
  return sortedHandArray.reduce((cardCounts, cardNumber) => {
    const cardCountIndex = cardCounts.findIndex(info => info.number === cardNumber);
    if (cardCountIndex !== -1) {
      cardCounts[cardCountIndex].count++;
      return cardCounts;
    };
    return [
      ...cardCounts,
      {
        number: cardNumber,
        count: COUNT_OF_ONE
      }
    ];
  }, [] as CardCount[]);
};

/**
 * 各数字の枚数情報を重複の多い順に並び変えて役の強いものから判定する。
 * @param {CardCount[]} cardCounts 各数字の枚数情報
 * @returns {string} 役名
 */
const judgeRoleDuplication = (cardCounts: CardCount[]): string => {
  const counts = cardCounts.map(info => info.count).sort((a, b) => b - a);
  const primaryCount = counts[0];
  const secondaryCount = counts[1];

  if (primaryCount === COUNT_OF_FOUR) {
    return FOUR_OF_A_KIND;
  }

  if (primaryCount === COUNT_OF_THREE) {
    return secondaryCount === COUNT_OF_TWO ? FULL_HOUSE : THREE_OF_A_KIND;
  }

  if (primaryCount === COUNT_OF_TWO) {
    return secondaryCount === COUNT_OF_TWO ? TWO_PAIR : ONE_PAIR;
  }

  return HIGH_CARD;
};

/**
 * 
 * @param {string} hand 役を判定すべき手札
 * @returns {string} 役名.
 */
export const main = (hand: string): string => {
  if (!VALIDATION_CHECK_REG_EXP.test(hand)) {
    return INPUT_ERROR;
  }

  const sortedHandArray = hand.split('').map(numStr => Number(numStr)).sort();

  if (isStraight(sortedHandArray)) {
    return STRAIGHT;
  }

  const cardCounts = getCardCounts(sortedHandArray);
  return judgeRoleDuplication(cardCounts);
};
main('13535');