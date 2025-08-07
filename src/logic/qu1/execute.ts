import {
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  HIGH_CARD,
  ONE_PAIR,
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
} from './constants';

/**
 *
 * @param {string} hand 役を判定すべき手札
 * @returns {string} 役名.
 */
export const main = (hand: string): string => {
  let unCheckedCards: string[] = Array.from(hand);

  const judgeHandInclude3IdenticalCards = (remainingHand: string[]): string => {
    return remainingHand.length === 2 && remainingHand[0] === remainingHand[1]
      ? FULL_HOUSE
      : THREE_OF_A_KIND;
  };

  const judgeHandInclude2IdenticalCards = (remainingHand: string[]): string => {
    const isSameFirstAndSecond =
      remainingHand[0] === remainingHand[1] && remainingHand.length >= 2;
    const isSameFirstAndThird =
      remainingHand[0] === remainingHand[2] && remainingHand.length === 3;
    const isSameSecondAndThird =
      remainingHand[1] === remainingHand[2] && remainingHand.length === 3;

    return isSameFirstAndSecond && isSameFirstAndThird && isSameSecondAndThird
      ? FULL_HOUSE
      : !(isSameFirstAndSecond || isSameFirstAndThird || isSameSecondAndThird)
      ? ONE_PAIR
      : TWO_PAIR;
  };

  const judgeHandAllDifferentCard = (): string => {
    const handArray: number[] = Array.from(hand).map((num) => Number(num));
    handArray.sort();

    return handArray[handArray.length - 1] - handArray[0] === 4
      ? STRAIGHT
      : HIGH_CARD;
  };

  //カードの重複があるかの判定
  while (unCheckedCards.length > 1) {
    const checkNum: string = unCheckedCards[0];
    let checkNumSum: number = 1;
    for (let i = 1; i < unCheckedCards.length; i++) {
      if (checkNum === unCheckedCards[i]) checkNumSum++;
    }
    unCheckedCards = unCheckedCards.filter((cardNum) => checkNum !== cardNum);

    //同じカードが4枚あった場合
    if (checkNumSum === 4) return FOUR_OF_A_KIND;
    //同じカードが3枚あった場合の判定
    if (checkNumSum === 3) {
      return judgeHandInclude3IdenticalCards(unCheckedCards);
    }
    //同じカードが2枚あった場合の判定
    if (checkNumSum === 2) {
      return judgeHandInclude2IdenticalCards(unCheckedCards);
    }
  }

  //すべてのカードが違う数字だった場合の判定
  return judgeHandAllDifferentCard();
};
main('44887');
