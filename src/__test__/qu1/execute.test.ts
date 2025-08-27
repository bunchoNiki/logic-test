import { describe, expect } from '@jest/globals';
import { main } from '@/logic/qu1/execute';
import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from '@/logic/qu1/constants';


describe('main test', () => {
  test.each([
    ['15111', FOUR_OF_A_KIND],
    ['29222', FOUR_OF_A_KIND],
    ['91999', FOUR_OF_A_KIND],
    ['65656', FULL_HOUSE],
    ['23233', FULL_HOUSE],
    ['97977', FULL_HOUSE],
    ['81181', FULL_HOUSE],
    ['32154', STRAIGHT],
    ['65342', STRAIGHT],
    ['73456', STRAIGHT],
    ['95876', STRAIGHT],
    ['52922', THREE_OF_A_KIND],
    ['61411', THREE_OF_A_KIND],
    ['85755', THREE_OF_A_KIND],
    ['39433', THREE_OF_A_KIND],
    ['35153', TWO_PAIR],
    ['47224', TWO_PAIR],
    ['61816', TWO_PAIR],
    ['41631', ONE_PAIR],
    ['75224', ONE_PAIR],
    ['93673', ONE_PAIR],
    ['84954', ONE_PAIR],
    ['64353', ONE_PAIR],
    ['95213', HIGH_CARD],
    ['81946', HIGH_CARD],
    ['37582', HIGH_CARD],
    ['91765', HIGH_CARD],
    ['62143', HIGH_CARD]
  ])('hand: %s should return %s', (hand, expected) => {
    const result = main(hand);
    expect(result).toEqual(expected);
  });
});