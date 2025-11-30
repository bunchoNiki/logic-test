import { TEST_CASES } from "@/logic/qu5/constants";
import { main } from "@/logic/qu5/execute";

describe('main', () => {
  test.each(TEST_CASES)(
    '$name',
    ({ cardNumber, key, expected }) => {
      expect(main(cardNumber, key)).toBe(expected);
    }
  );
});
