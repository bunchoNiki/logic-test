import { emptyBoard, invalidBoxBoard, invalidBoxWithZeros, invalidColumnBoard, invalidColumnWithZeros, invalidRowBoard, invalidRowWithZeros, MagicSquare, validIncompleteBoard, validSolvedBoard } from '@/logic/qu4/constants';
import { main } from '@/logic/qu4/execute';

type TestCase = {
  name: string,
  board: MagicSquare,
  expected: boolean
}

describe('数独チェッカー', () => {

  const testCases: Array<TestCase> = [
    { name: '正しく完成した盤面', board: validSolvedBoard, expected: true },
    { name: '未完成だがルール違反のない盤面', board: validIncompleteBoard, expected: true },
    { name: '完全に空の盤面', board: emptyBoard, expected: true },
    { name: '行に重複がある不正な盤面', board: invalidRowBoard, expected: false },
    { name: '列に重複がある不正な盤面', board: invalidColumnBoard, expected: false },
    { name: '3x3ブロックに重複がある不正な盤面', board: invalidBoxBoard, expected: false },
    { name: '行内に未回答(0)と重複が混在する不正な盤面', board: invalidRowWithZeros, expected: false },
    { name: '列内に未回答(0)と重複が混在する不正な盤面', board: invalidColumnWithZeros, expected: false },
    { name: '3x3ブロック内に未回答(0)と重複が混在する不正な盤面', board: invalidBoxWithZeros, expected: false },
  ];

  test.each(testCases)(
    '$name の場合、正しく判定できること',
    ({ board, expected }) => {
      expect(main(board)).toBe(expected);
    }
  );
});