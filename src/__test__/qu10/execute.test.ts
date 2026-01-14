import { DATA_BASIC, DATA_ERROR_NEGATIVE, DATA_FLAT, DATA_LARGE_VALLEY, DATA_MOUNTAIN, DATA_STAIRS } from "@/logic/qu10/constants";
import { main } from "@/logic/qu10/execute";


type NormalTestCase = {
  name: string;
  heights: number[];
  expected: number;
};

type ErrorTestCase = {
  name: string;
  heights: number[];
  expectedErrorValue: number;
};

const normalTestCases: NormalTestCase[] = [
  {
    name: '基本的な複雑な地形',
    heights: DATA_BASIC.heights,
    expected: DATA_BASIC.expected
  },
  {
    name: '大きな谷がある地形',
    heights: DATA_LARGE_VALLEY.heights,
    expected: DATA_LARGE_VALLEY.expected
  },
  {
    name: '山型（水はたまらない）',
    heights: DATA_MOUNTAIN.heights,
    expected: DATA_MOUNTAIN.expected
  },
  {
    name: '階段状（水はたまらない）',
    heights: DATA_STAIRS.heights,
    expected: DATA_STAIRS.expected
  },
  {
    name: '平坦（水はたまらない）',
    heights: DATA_FLAT.heights,
    expected: DATA_FLAT.expected
  }
];

const errorTestCases: ErrorTestCase[] = [
  {
    name: '負の値が含まれる場合',
    heights: DATA_ERROR_NEGATIVE.heights,
    expectedErrorValue: DATA_ERROR_NEGATIVE.errorValue
  }
];

describe('Trapping Rain Water', () => {
  describe('正常系', () => {
    test.each(normalTestCases)(
      '$name',
      ({ heights, expected }) => {
        expect(main(heights)).toBe(expected);
      }
    );
  });

  describe('異常系', () => {
    test.each(errorTestCases)(
      '$name',
      ({ heights, expectedErrorValue }) => {
        expect(() => {
          main(heights);
        }).toThrow(`Invalid height value: ${expectedErrorValue}. Height must be non-negative.`);
      }
    );
  });
});