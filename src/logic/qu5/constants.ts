type Enumerate<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Key = Enumerate<256>;


export const ACTIVE_CARD = '有効なカード番号';
export const NONACTIVE_CARD = '無効なカード番号';

const VISA_CARD = 'Visa';
const MASTER_CARD = 'Mastercard';
const AMEX_CARD = 'American Express';

const VISA_CARD_LENGTH = 16 as const;
const MASTER_CARD_LENGTH = 16 as const;
const AMEX_CARD_LENGTH = 15 as const;


export const BRAND_CHECK_RULES = [
  {
    brand: VISA_CARD,
    rule: (c: string) => new RegExp('^4.*').test(c),
    length: VISA_CARD_LENGTH
  },
  {
    brand: MASTER_CARD,
    rule: (c: string) => new RegExp('^5+(1|6).*').test(c),
    length: MASTER_CARD_LENGTH
  },
  {
    brand: AMEX_CARD,
    rule:  (c: string) => new RegExp('^3+(4|7).*').test(c),
    length: AMEX_CARD_LENGTH
  }
];

export type TestCase = {
  name: string;
  cardNumber: string;
  key: Key,
  expected: string
}

export const TEST_CASES: Array<TestCase> = [
  {
    name: 'Visaとして正しく判定されるケース',
    cardNumber: '4242 4242 4242 4242',
    key: 123,
    expected: VISA_CARD,
  },
  {
    name: 'Mastercardとして正しく判定されるケース',
    cardNumber: '5123 4567 8901 2346',
    key: 101,
    expected: MASTER_CARD,
  },
  {
    name: 'American Expressとして正しく判定されるケース',
    cardNumber: '3779-863184-30142',
    key: 200,
    expected: AMEX_CARD,
  },
  {
    name: 'Luhnチェックは成功するが、ブランド判定はされないケース',
    cardNumber: '79927398713',
    key: 10,
    expected: ACTIVE_CARD,
  },
  {
    name: 'Luhnチェックで失敗するケース (チェックディジットが不正)',
    cardNumber: '4242 4242 4242 4243',
    key: 55,
    expected: NONACTIVE_CARD,
  }
];