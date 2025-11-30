import { testCases } from '@/logic/qu6/constants';
import { main } from '../../logic/qu6/execute';

describe('JSONキー探索とマスク化', () => {
  test.each(testCases)('$name', ({ rawData, targets, expected }) => {
      const inputData = Array.isArray(rawData) ? rawData : [rawData];
      expect(main(inputData, targets)).toEqual(expected);
    }
  );
});