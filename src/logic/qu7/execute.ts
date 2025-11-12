import { SUFFIX_FOR_CONSONANTS, SUFFIX_FOR_VOWELS, VOWELS_LOWER } from "./constants";

/**
 * 英語の文章を受け取り、ピッグ・ラテンのルールに従って翻訳した文章を返す。
 *
 * @param {string} sentence - 翻訳したい英語の文章（大文字・小文字、句読点を含む場合がある）。
 * @returns {string} ピッグ・ラテンに翻訳された文章。
 */
export const main = (sentence: string): string => {
  if (sentence === '') {
    return '';
  }

  const words = sentence.split(' ');
  const translatedWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let punctuation = '';

    const lastChar = word[word.length - 1];
    if (lastChar === ',' || lastChar === '.' || lastChar === '!' || lastChar === '?') {
      punctuation = lastChar;
      word = word.substring(0, word.length - 1);
    }

    if (word.length === 0) {
      translatedWords.push(punctuation);
      continue;
    }

    let wasCapitalized = false;
    const firstChar = word[0];
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      wasCapitalized = true;
    }

    const firstCharLower = firstChar.toLowerCase();

    if (VOWELS_LOWER.includes(firstCharLower)) {
      translatedWords.push(word + SUFFIX_FOR_VOWELS + punctuation);
    } else {
      const firstLetter = word.substring(0, 1);
      let restOfWord = word.substring(1);

      if (wasCapitalized && restOfWord.length > 0) {
        restOfWord = restOfWord.charAt(0).toUpperCase() + restOfWord.substring(1);
      }

      translatedWords.push(restOfWord + firstLetter.toLowerCase() + SUFFIX_FOR_CONSONANTS + punctuation);
    }
  }

  return translatedWords.join(' ');
};

main('main');