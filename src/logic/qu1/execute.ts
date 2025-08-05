import { HIGH_CARD, STRAIGHT } from "./constants";

const VALIDATION_CHECK_REG_EXP = /\d{5}/;
const INPUT_ERROR = "入力エラー";
const FIRST_INDEX = 0;
const STRAIGHT_DIFFERENCE = 1;

const isStraight = (handArray: number[]) => {
  return handArray.every((cardNumber, index) => {
    if (index === FIRST_INDEX) {
      return cardNumber;
    }
    return cardNumber - handArray[index - 1] === STRAIGHT_DIFFERENCE;
  });
};

// type HandInfo = {
//   [key: number]: number;
// }


// const check = (handArray: number[], setHandArray:Set<number>):HandInfo[] => {
//   return handArray.reduce((handInfo, cardNumber, index) => {
//     if (Object.keys(handInfo).includes(cardNumber)) {

//     }
//   }, []);
// };

/**
 * 
 * @param {string} hand 役を判定すべき手札
 * @returns {string} 役名.
 */
export const main = (hand: string): string => {
  if (VALIDATION_CHECK_REG_EXP.test(hand)) {
    return INPUT_ERROR;
  }

  const handArray = hand.split('').map(numStr => Number(numStr)).sort();
  const setHandArray = new Set(handArray);

  if (setHandArray.size === handArray.length) {
    return isStraight(handArray) ? STRAIGHT : HIGH_CARD;
  }


  return hand;
};
main('13535');