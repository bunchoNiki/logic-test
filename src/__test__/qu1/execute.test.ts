import { describe, expect } from '@jest/globals';
import { main } from '@/logic/qu1/execute';
import { FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, ONE_PAIR, STRAIGHT, THREE_OF_A_KIND, TWO_PAIR } from '@/logic/qu1/constants';


describe('main test', () => {
  test.each([
    ['11115', FOUR_OF_A_KIND],
    ['22229', FOUR_OF_A_KIND],
    ['23456', STRAIGHT],
    ['32564', STRAIGHT],
    ['34567', STRAIGHT],
    ['76345', STRAIGHT],
    ['87456', STRAIGHT],
    ['55666', FULL_HOUSE],
    ['33322', FULL_HOUSE],
    ['77799', FULL_HOUSE],
    ['11188', FULL_HOUSE],
    ['22295', THREE_OF_A_KIND],
    ['11146', THREE_OF_A_KIND],
    ['55578', THREE_OF_A_KIND],
    ['33349', THREE_OF_A_KIND],
    ['13355', TWO_PAIR],
    ['13535', TWO_PAIR],
    ['22447', TWO_PAIR],
    ['11668', TWO_PAIR],
    ['11346', ONE_PAIR],
    ['22457', ONE_PAIR],
    ['33679', ONE_PAIR],
    ['44589', ONE_PAIR],
    ['13529', HIGH_CARD],
    ['14689', HIGH_CARD],
    ['23578', HIGH_CARD],
    ['15679', HIGH_CARD]
  ])('hand: %s should return %s', (hand, expected) => {
    const result = main(hand);
    expect(result).toEqual(expected);
  });
});