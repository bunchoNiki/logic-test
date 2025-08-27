import { Mode, testCases } from '@/logic/qu3/constants';
import { main } from '@/logic/qu3/execute';

describe('ヴィジュネル暗号 - 暗号化', () => {


  test.each(testCases)(
    '$name の場合、正しく暗号化されること',
    ({ text, key, mode, expected }) => {
      expect(main(text, key, mode as Mode)).toBe(expected);
    }
  );
});

describe.skip('ヴィジュネル暗号 - 復号', () => {


  test.each(testCases)(
    '$name の場合、正しく復号されること',
    ({ text, key: expected, mode, expected: key }) => {
      expect(main(text, key, mode as Mode)).toBe(expected);
    }
  );
});