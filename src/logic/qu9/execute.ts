/**
 * 単語の配列を指定された最大幅で均等割り付け（Justify）して整形を行う。
 *
 * @param words 単語の配列。
 * @param maxWidth 1行あたりの最大文字数。
 * @returns 整形された行の配列。
 * @throws {Error} 単語の長さが maxWidth を超えている場合。
 */
export const main = (words: string[], maxWidth: number): string[] => {
  for (const word of words) {
    if (word.length > maxWidth) {
      throw new Error(`Word "${word}" (length ${word.length}) exceeds maxWidth (${maxWidth})`);
    }
  }

  const result: string[] = [];
  let currentLine: string[] = [];
  let currentLen = 0;

  for (const word of words) {
    if (currentLen + word.length + currentLine.length > maxWidth) {
      result.push(justifyLine(currentLine, currentLen, maxWidth, false));
      currentLine = [];
      currentLen = 0;
    }
    currentLine.push(word);
    currentLen += word.length;
  }

  if (currentLine.length > 0) {
    result.push(justifyLine(currentLine, currentLen, maxWidth, true));
  }

  return result;
};

const justifyLine = (lineWords: string[], lineLength: number, maxWidth: number, isLastLine: boolean): string => {
  if (lineWords.length === 1 || isLastLine) {
    return lineWords.join(' ').padEnd(maxWidth, ' ');
  }

  const gapCount = lineWords.length - 1;
  const totalSpaces = maxWidth - lineLength;

  const spacePerGap = Math.floor(totalSpaces / gapCount);
  const extraSpaces = totalSpaces % gapCount;

  let lineStr = '';
  for (let i = 0; i < lineWords.length; i++) {
    lineStr += lineWords[i];

    if (i < gapCount) {
      const spaces = spacePerGap + (i >= gapCount - extraSpaces ? 1 : 0);
      lineStr += ' '.repeat(spaces);
    }
  }

  return lineStr;
};