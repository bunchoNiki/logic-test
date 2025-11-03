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

export const CARD_BRAND_RULES = [
  { name: VISA_CARD, start: [4], length: 16 },
  { name: MASTER_CARD, start: [51, 52, 53, 54, 55], length: 16 },
  { name: AMEX_CARD, start: [34, 37], length: 15 }
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