/**
 * 正常系: 基本的なケース
 * 窪みが複数あり、複雑な地形
 */
export const DATA_BASIC = {
  heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  expected: 6
};

/**
 * 正常系: 大きな谷 (V字型)
 */
export const DATA_LARGE_VALLEY = {
  heights: [4, 2, 0, 3, 2, 5],
  expected: 9
};

/**
 * 正常系: 水がたまらないケース (山型)
 * 中心が高く、両端に向かって下がっていく地形
 */
export const DATA_MOUNTAIN = {
  heights: [1, 3, 5, 4, 2],
  expected: 0
};

/**
 * 正常系: 水がたまらないケース (階段状)
 * 一方向に増加、または減少のみ
 */
export const DATA_STAIRS = {
  heights: [0, 1, 2, 3, 4, 5],
  expected: 0
};

/**
 * 正常系: 平坦 (すべて同じ高さ)
 */
export const DATA_FLAT = {
  heights: [3, 3, 3, 3],
  expected: 0
};

/**
 * 異常系: 負の値が含まれる
 */
export const DATA_ERROR_NEGATIVE = {
  heights: [1, 0, -1, 2],
  errorValue: -1
};