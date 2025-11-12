import { testCases } from "@/logic/qu7/constants";
import { main } from "@/logic/qu7/execute";

describe('ピッグ・ラテン (Pig Latin) 翻訳機', () => {
  test.each(testCases)(
    '$name',
    ({ input, expected }) => {
      expect(main(input)).toBe(expected);
    }
  );
});