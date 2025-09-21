import { MagicSquare } from './constants';

const isValidGroup = (group: number[]): boolean => {
  const filteredGroup = group.filter(num => num !== 0);
  const uniqueNumbers = new Set(filteredGroup);
  return uniqueNumbers.size === filteredGroup.length;
};

/**
 * 数独が解けているか判定を行う.
 * @param board MagicSquare
 * @returns boolean
 */
export const main = (board: MagicSquare): boolean => {
  for (let i = 0; i < 9; i++) {
    const row = board[i];
    if (!isValidGroup(row)) {
      return false;
    }
  }

  const columns: MagicSquare = board.map(() => []);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      columns[c][r] = board[r][c];
    }
  }

  for (let i = 0; i < 9; i++) {
    const column = columns[i];
    if (!isValidGroup(column)) {
      return false;
    }
  }

  return true;

};

main([[]]);