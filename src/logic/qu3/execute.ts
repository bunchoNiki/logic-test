import { ALPHABET_SIZE, LOWERCASE_ALPHABET, Mode, UPPERCASE_ALPHABET } from './constants';

export const main = (text: string, key: string, mode: Mode): string => {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keyChar = key[i % key.length];

    const upperIndex = UPPERCASE_ALPHABET.indexOf(char);
    const lowerIndex = LOWERCASE_ALPHABET.indexOf(char);

    if (upperIndex === -1 && lowerIndex === -1) {
      result += char;
      continue;
    }

    const isUppercase = upperIndex !== -1;
    const textCharIndex = isUppercase ? upperIndex : lowerIndex;
    const keyCharIndex = LOWERCASE_ALPHABET.indexOf(keyChar.toLowerCase());

    let newIndex;
    if (mode === 'encrypt') {
      newIndex = (textCharIndex + keyCharIndex) % ALPHABET_SIZE;
    } else {
      newIndex = (textCharIndex - keyCharIndex + ALPHABET_SIZE) % ALPHABET_SIZE;
    }

    if (isUppercase) {
      result += UPPERCASE_ALPHABET[newIndex];
    } else {
      result += LOWERCASE_ALPHABET[newIndex];
    }
  }

  return result;
};

main('Hello World!', 'key', 'encrypt');