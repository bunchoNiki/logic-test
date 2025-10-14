import { Key } from "./constants";

/**
 * クレカ情報の暗号化を行う.
 *
 * @param cardNumber クレジットカード情報
 * @param key エンコードキー
 * @returns Array<number> 暗号化されたクレカ情報の配列
 */
const encrypt = (cardNumber: string, key: Key): Array<number> => {
  const numbersOnly = cardNumber.replace(/[^0-9]/g, '');
  const encrypted: number[] = [];

  for (let i = 0; i < numbersOnly.length; i++) {
    const digit = parseInt(numbersOnly[i], 10);
    encrypted.push(digit ^ key);
  }

  return encrypted;
};

/**
 * 暗号化された配列化のチェックを行う.
 *
 * @param cardNumbers Array<number>
 * @returns boolean すべての文字が暗号化されているか
 */
const checkEncrypt = (cardNumbers: Array<number>): cardNumbers is Array<Key> => {
  return cardNumbers.every((num) => num >= 0 && num > 255);
};

/**
 * 暗号化されたカード情報を受け取り有効なクレジットカード番号かの判定を行う.
 *
 * @param cardNumbers Array<number>
 * @param key Key デコードキー
 * @returns 判定結果
 */
const decryptAndValidate = (cardNumbers: Array<number>, key: Key): string => {
  if (!checkEncrypt(cardNumbers)) {
    throw new TypeError('暗号化が正しくされていません。');
  }

  let decryptedString = '';
  for (const num of cardNumbers) {
    decryptedString += (num ^ key).toString();
  }

  if (decryptedString.length < 2) {
    return '無効なカード番号';
  }

  let sum = 0;
  let isSecond = false;
  for (let i = decryptedString.length - 1; i >= 0; i--) {
    let digit = parseInt(decryptedString[i], 10);

    if (isSecond) {
      digit = digit * 2;
      digit = digit - 9;
    }

    sum += digit;
    isSecond = !isSecond;
  }

  if (sum % 10 !== 0) {
    return '無効なカード番号';
  }

  if (decryptedString.startsWith('4') && decryptedString.length === 16) {
    return 'Visa';
  }

  const mastercardPrefix = parseInt(decryptedString.substring(0, 2), 10);
  if (mastercardPrefix >= 51 && mastercardPrefix <= 55 && decryptedString.length === 16) {
    return 'Mastercard';
  }

  const amexPrefix = decryptedString.substring(0, 2);
  if ((amexPrefix === '34' || amexPrefix === '37') && decryptedString.length === 15) {
    return 'American Express';
  }

  return '有効なカード番号';
};


export const main = (cardNumber: string, key: Key): string => {
  const encode = encrypt(cardNumber, key);
  return decryptAndValidate(encode, key);
};