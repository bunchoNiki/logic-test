export const UPPERCASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWERCASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
export const ALPHABET_SIZE = 26;


export const enCrypt = 'encrypt' as const;
export const decrypt = 'decrypt' as const;
export type Mode = typeof enCrypt  | typeof decrypt;

export const testCases = [
  {
    name: 'READMEの例：小文字・大文字・スペース・記号が混在するケース',
    text: 'Hello World!',
    key: 'key',
    mode: 'encrypt',
    expected: 'Rijvs Uyvjn!',
  },
  {
    name: 'READMEの例：大文字とスペースのみのケース',
    text: 'ATTACK AT DAWN',
    key: 'lemon',
    mode: 'encrypt',
    expected: 'LXFOPV EF RNHR',
  },
  {
    name: 'アルファベットが末尾で循環するケース (Zの次がAになる)',
    text: 'XYZ',
    key: 'cde',
    mode: 'encrypt',
    expected: 'ZBD',
  },
  {
    name: '鍵が平文より長いケース',
    text: 'HI',
    key: 'secret',
    mode: 'encrypt',
    expected: 'ZM',
  },
  {
    name: '平文が空文字列のケース',
    text: '',
    key: 'key',
    mode: 'encrypt',
    expected: '',
  },
  {
    name: '数字や記号が変化しないことを確認するケース',
    text: 'Test 123 Go!',
    key: 'a',
    mode: 'encrypt',
    expected: 'Test 123 Go!',
  },
];