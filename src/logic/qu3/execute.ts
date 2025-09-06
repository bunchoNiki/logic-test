import {
  ALPHABET_SIZE,
  enCrypt,
  LOWERCASE_ALPHABET,
  Mode,
  UPPERCASE_ALPHABET,
} from './constants';

export const main = (word: string, key: string, mode: Mode) => {
  if (mode === enCrypt) {
    const wordAry: string[] = word.split('');
    const isWordUppercase: (boolean | null)[] = wordAry.map((alphabet) => {
      if (!/[a-zA-Z]/.test(alphabet)) return null;
      return alphabet.toUpperCase() === alphabet ? true : false;
    });

    // アルファベット以外の場合は-1が入る
    const wordNum: number[] = wordAry.map((alphabet, i) =>
      isWordUppercase[i]
        ? UPPERCASE_ALPHABET.indexOf(alphabet)
        : LOWERCASE_ALPHABET.indexOf(alphabet)
    );
    const keyNum: number[] = key
      .split('')
      .map((k) => LOWERCASE_ALPHABET.indexOf(k));

    const total: number[] = [];
    let keyUsedTime: number = 0;
    for (const num of wordNum) {
      if (num < 0) {
        total.push(num);
        continue;
      }

      const sum: number = num + keyNum[keyUsedTime % keyNum.length];
      total.push(sum % ALPHABET_SIZE);
      keyUsedTime++;
    }

    const result = total
      .map((t, i) => {
        if (t < 0) return wordAry[i];
        if (isWordUppercase[i]) {
          return UPPERCASE_ALPHABET.charAt(t);
        } else {
          return LOWERCASE_ALPHABET.charAt(t);
        }
      })
      .join('');

    return result;
  }
};

main(`${LOWERCASE_ALPHABET} ${UPPERCASE_ALPHABET}`, 'key', 'encrypt');
