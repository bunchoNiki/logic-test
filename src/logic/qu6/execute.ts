/* eslint-disable @typescript-eslint/no-explicit-any */

import { Target } from './constants';

  /**
   * rawData（HTTPSまたはSSE形式）を解析し、targetsで指定されたキーに最初に見つかった値を、
   * 指定された率でマスク化して返す。
   *
   * @param rawData 入力データ（文字列配列または単一のSSE文字列）。
   * @param targets 検索するキーとマスク化率を定義するオブジェクトの配列。
   * @returns 最初に見つかったマスク化された値。見つからない場合はundefined。
   */
export const main = (rawData: Array<string>, targets: Array<Target>): Record<string, any | undefined> => {
  const result: Record<string, any | undefined> = {};
  targets.forEach(target => {
    result[target.key] = undefined;
  });

  let jsonStrings: string[] = [];

  const isSSE = rawData.length === 1 && rawData[0]?.startsWith('data:');

  if (isSSE) {
    const lines = rawData[0].split('\n');
    lines.forEach(line => {
      if (line.startsWith('data:')) {
        jsonStrings.push(line.substring(5).trim());
      }
    });
  } else {
    jsonStrings = rawData;
  }

  const findKeyRecursive = (data: any, keyToFind: string): any | undefined => {
    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        for (const item of data) {
          const found = findKeyRecursive(item, keyToFind);
          if (found !== undefined) {
            return found;
          }
        }
      } else {
        for (const key in data) {
          if (key === keyToFind) {
            return data[key];
          }
          const found = findKeyRecursive(data[key], keyToFind);
          if (found !== undefined) {
            return found;
          }
        }
      }
    }
    return undefined;
  };

  for (const jsonStr of jsonStrings) {
    if (!jsonStr) {
      continue;
    }
    // try...catch removed
    const parsedData = JSON.parse(jsonStr);
    targets.forEach(target => {
      if (result[target.key] === undefined) {
        const value = findKeyRecursive(parsedData, target.key);
        if (value !== undefined) {
          if (typeof value === 'string' && target.maskRate > 0) {
            const maskLength = Math.ceil(value.length * target.maskRate);
            // Buggy substring index remains
            result[target.key] = '*'.repeat(maskLength) + value.substring(maskLength + 1);
          } else {
            result[target.key] = value;
          }
        }
      }
    });
  }

  return result;
};