import { ALPHABET_SIZE, decrypt, enCrypt, LOWERCASE_ALPHABET, Mode, UPPERCASE_ALPHABET } from './constants';


const ALPHABET = LOWERCASE_ALPHABET + UPPERCASE_ALPHABET;
type method =  (word: string, key: string) => string;

const decoding: method = (word, key) => {
  return word + key;
};

const encoding: method = (word, key)  => {
  const keyMap = convertKeyMap(key);
  let skipCount = 0;
  return [...word].map((char, index) => {
    if (!/^[a-zA-Z]+$/.test(char)) {
      skipCount++;
      return char;
    }

    const wordIndex = ALPHABET.indexOf(char);
    const keyIndex = keyMap[(index - skipCount) % key.length];

    // 大文字小文字の処理をスキップするために大文字の場合は+26して大文字のある番地に変換
    const added = ALPHABET_SIZE * Math.floor(wordIndex / ALPHABET_SIZE);
    const charIndex = (wordIndex + keyIndex) % ALPHABET_SIZE + added;

    return ALPHABET.slice(charIndex, charIndex  + 1);
  }).join('');
};

/**
 * keyを参照しやすいMapへの変換処理を行う.
 * @param key 変換用のキー
 * @returns 変換後の対応する数値のMap
 */
const convertKeyMap = (key: string): Record<number, number> => {
  return [...key].reduce((m, s, i) => ({ ...m, [i]: LOWERCASE_ALPHABET.indexOf(s) }), {});
};

const logic: Record<Mode, method> = {
  [decrypt]: decoding,
  [enCrypt]: encoding
};

export const main = (word: string, key: string, mode: Mode) => logic[mode](word, key);
main('Hello World!', 'key', 'encrypt');
