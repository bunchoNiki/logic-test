/* eslint-disable @typescript-eslint/no-explicit-any */

import { Target } from "./constants";

/**
 * 特定のプロパティを探す関数
 * @param {any} target 探したいオブジェクトもしくは値
 * @param {string} key 検索したいキー名
 */
const findProperty = (target: any, key: string) => {
  if (typeof target !== "object") return undefined;

  const value = target[key];
  if (typeof value !== "undefined") return value;
  return findProperty(target[Object.keys(target)[0]], key);
};

/**
 * 指定の数分*に変換する関数
 * @param {string} value - 変換する対象の文字列
 * @param {Target} target - 検索するキーとマスク化率を定義するオブジェクト
 */
const replaceAsterisk = (value: string, target: Target) => {
  const replaceCharNum = Math.ceil(value.length * target.maskRate);
  const keepValue = value.substring(replaceCharNum, value.length);

  return "*".repeat(replaceCharNum) + keepValue;
};

/**
 * rawData（HTTPSまたはSSE形式）を解析し、targetsで指定されたキーに最初に見つかった値を、
 * 指定された率でマスク化して返す関数
 * @param {Array<string>} rawData - 入力データ（文字列配列または単一のSSE文字列）
 * @param {Array<Target>} targets - 検索するキーとマスク化率を定義するオブジェクトの配列
 * @returns {Record<string, string | undefined>} - 最初に見つかったマスク化された値、見つからない場合はundefined
 */
export const main = (
  rawData: Array<string>,
  targets: Array<Target>
): Record<string, string | undefined> => {
  const isFormatB = /\n/.test(rawData[0]);
  const analyzableData: Array<string> = isFormatB
    ? rawData[0].replaceAll("data: ", "").split(/\n/)
    : rawData;

  const parseData = analyzableData.map((data) => {
    try {
      const value = JSON.parse(data);
      return value;
    } catch {
      return "";
    }
  });

  const resultValuesKeys = targets.map((target) => target.key);
  const resultValues = Object.fromEntries(
    resultValuesKeys.map((key) => [key, undefined])
  );

  targets.forEach((target) => {
    parseData.forEach((data) => {
      const value = findProperty(data, target.key);
      if (typeof value === "undefined" || resultValues[target.key]) return;

      resultValues[target.key] =
        typeof value === "string" ? replaceAsterisk(value, target) : value;
    });
  });

  return resultValues;
};
