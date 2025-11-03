import { Key, ACTIVE_CARD, NONACTIVE_CARD, CARD_BRAND_RULES } from "./constants";

/**
 * クレカ情報の暗号化を行う.
 *
 * @param cardNumber クレジットカード情報
 * @param key エンコードキー
 * @returns Array<number> 暗号化されたクレカ情報の配列
 */
const encrypt = (cardNumber: string, key: Key): Array<number> => {
  return getDigitChars(cardNumber).map(num => Number(num) ^ key);
};

/**
 * 暗号化された配列化のチェックを行う.
 *
 * @param cardNumbers Array<number>
 * @returns boolean すべての文字が暗号化されているか
 */
const checkEncrypt = (cardNumbers: Array<number>): cardNumbers is Array<Key> => {
  return cardNumbers.every((num) => 0 <= num && num <= 255);
};

/**
 * 暗号化されたカード情報を受け取り有効なクレジットカード番号かの判定を行う.
 *
 * @param cardNumbers Array<number>
 * @param key Key デコードキー
 * @returns 判定結果
 */
const decryptAndValidate = (cardNumbers: Array<number>, key: Key): boolean => {
  if (!checkEncrypt(cardNumbers)) {
    throw new TypeError('暗号化が正しくされていません。');
  }
  const decryptedNumbers = cardNumbers.map(num => Number(num) ^ key);
  if (decryptedNumbers.length < 2) return false;

  let sum = 0;
  for (let i = decryptedNumbers.length - 2; i >= 0; i--) {
    let num = decryptedNumbers[i];
    if ((decryptedNumbers.length - i) % 2 === 0) {
      num *= 2;
      if (num > 9) {
        num = Math.floor(num / 10) + (num % 10);
      }
    }
    sum += num;
  }
  sum += decryptedNumbers[decryptedNumbers.length - 1];
  return sum % 10 === 0;
};

/**
 * 文字列から数字を取り出して配列に変換する。
 * 
 * @param input 文字列 
 * @returns 数字配列
 */
const getDigitChars = (input: string): string[] => {
  return input.split('').filter(cha => cha >= '0' && cha <= '9');
};

/**
 * カードブランドの判定を行う。
 * 
 * @param cardNumber カード番号
 * @returns カードブランド名
 */
const checkCardBrand = (cardNumber: string): string | undefined => {
  const oneDigit = Number(cardNumber[0]);
  const twoDigit = Number(cardNumber.slice(0, 2));
  for (const rule of CARD_BRAND_RULES) {
    if (cardNumber.length === rule.length && rule.start.some(sta => sta === oneDigit || sta === twoDigit)) {
      return rule.name;
    }
  }
  return undefined;
};

export const main = (cardNumber: string, key: Key): string => {
  const encode = encrypt(cardNumber, key);
  if (!decryptAndValidate(encode, key)) return NONACTIVE_CARD;
  const brand = checkCardBrand(getDigitChars(cardNumber).join(""));
  if (brand) return brand;
  return ACTIVE_CARD;
};

main('4992-7398-716-922', 55);