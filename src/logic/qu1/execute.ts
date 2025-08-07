import { FIRST_INDEX, FOUR_OF_A_KIND, FULL_HOUSE, FOUR_PIECE, HIGH_CARD, INPUT_ERROR, ONE_PAIR, ONE_PIECE, STRAIGHT, STRAIGHT_DIFFERENCE, THREE_OF_A_KIND, THREE_PIECE, TWO_PAIR, TWO_PIECE, ALL_SAME_NUMBERS, VALIDATION_CHECK_REG_EXP } from "./constants";
import { DuplicationInfo } from "./types";

/**
 * 昇順に並び変えた手札(数字)の隣合う各要素の差分が1であるかをもってストレート判定する。
 * @param {number[]} handArray 手札
 * @returns {boolean} ストレート判定結果
 */
const isStraight = (handArray: number[]): boolean => {
  return handArray.every((cardNumber, index) => {
    if (index === FIRST_INDEX) {
      return true;
    }
    return cardNumber - handArray[index - 1] === STRAIGHT_DIFFERENCE;
  });
};

/**
 * 手札から重複する手札(数字)の情報を形成する。
 * @param {number[]} handArray 手札
 * @returns {DuplicationInfo[]} 重複する手札(数字)の情報
 */
const getDuplicationInfo = (handArray: number[]): DuplicationInfo[] => {
  return handArray.reduce((hand, cardNumber) => {
    const duplicationIndex = hand.findIndex(info => info.card === cardNumber);
    if (duplicationIndex !== -1) {
      hand[duplicationIndex].piece++;
      return hand;
    };
    return [
      ...hand,
      {
        card: cardNumber,
        piece: ONE_PIECE
      }
    ];
  }, [] as DuplicationInfo[]);
};

/**
 * 重複する手札(数字)の情報を役の強い順番に並び変えて判定する。
 * @param {DuplicationInfo[]} duplicationInfo 重複する手札(数字)の情報
 * @returns {string} 役名
 */
const judgeRoleDuplication = (duplicationInfo: DuplicationInfo[]): string => {
  const pieces = duplicationInfo.map(info => info.piece).sort((a, b) => b - a);
  const primaryPiece = pieces[0];
  const secondaryPiece = pieces[1];

  if (primaryPiece === FOUR_PIECE) {
    return FOUR_OF_A_KIND;
  }

  if (primaryPiece === THREE_PIECE) {
    return secondaryPiece === TWO_PIECE ? FULL_HOUSE : THREE_OF_A_KIND;
  }

  if (primaryPiece === TWO_PIECE) {
    return secondaryPiece === TWO_PIECE ? TWO_PAIR : ONE_PAIR;
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

  const handArray = hand.split('').map(numStr => Number(numStr)).sort();

  if (handArray.every(hand => hand === handArray[FIRST_INDEX])) {
    return ALL_SAME_NUMBERS;
  }

  if (isStraight(handArray)) {
    return STRAIGHT;
  }

  const duplicationInfo = getDuplicationInfo(handArray);
  return judgeRoleDuplication(duplicationInfo);
};
main('13535');