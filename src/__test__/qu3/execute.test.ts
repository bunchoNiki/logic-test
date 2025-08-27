import { decrypt, enCrypt, testCases } from '@/logic/qu3/constants';
import { main } from '@/logic/qu3/execute';

describe('ヴィジュネル暗号 - 暗号化', () => {
  test.each(testCases)(
    '$name の場合、正しく暗号化されること',
    ({ text, key, expected }) => {
      expect(main(text, key, enCrypt)).toBe(expected);
    }
  );
});

describe.skip('ヴィジュネル暗号 - 復号', () => {
  test.each(testCases)(
    '$name の場合、正しく復号されること',
    ({ text, key: expected, expected: key }) => {
      expect(main(text, key, decrypt)).toBe(expected);
    }
  );
});