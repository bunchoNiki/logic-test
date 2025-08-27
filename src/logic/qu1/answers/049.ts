import { FOUR_OF_A_KIND, FULL_HOUSE, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from '../constants';

type CardCount = {
  cardNumber: number;
  count: number;
}

const HIGH_CARD = '役なし';
const VALIDATION_CHECK_REG_EXP = /^\d{5}$/;
const INPUT_ERROR = "入力エラー";
const FIRST_INDEX = 0;
const COUNT_OF_ONE = 1;
const COUNT_OF_TWO = 2;
const COUNT_OF_THREE = 3;
const COUNT_OF_FOUR = 4;
const STRAIGHT_DIFFERENCE = 1;
const NOT_FOUNT_INDEX = -1;


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
    const cardCountIndex = cardCounts.findIndex(info => info.cardNumber === cardNumber);
    if (cardCountIndex === NOT_FOUNT_INDEX) {
      return [...cardCounts, { cardNumber, count: COUNT_OF_ONE }];
    };
    cardCounts[cardCountIndex].count++;
    return cardCounts;
  }, [] as CardCount[]);
};

/**
 * 各数字の枚数情報を重複の多い順に並び変えて役の強いものから判定する。
 * @param {CardCount[]} cardCounts 各数字の枚数情報
 * @returns {string} 役名
 */
const judgeRoleDuplication = (cardCounts: CardCount[]): string => {
  const counts = cardCounts.map(info => info.count).sort((a, b) => b - a);
  const [primaryCount, secondaryCount] = counts;

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