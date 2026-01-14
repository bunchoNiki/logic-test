
/**
 * 地形の高さマップを受け取り、溜まる雨水の総量を計算します。
 *
 * @param heights 各柱の高さを表す配列
 * @returns 溜まった水の総量
 * @throws {Error} 負の高さが含まれている場合
 */
export const main = (heights: number[]): number => {
  for (const h of heights) {
    if (h < 0) {
      throw new Error(`Invalid height value: ${h}. Height must be non-negative.`);
    }
  }

  const n = heights.length;
  if (n === 0) return 0;

  const leftMax = new Array(n).fill(0);
  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
  }

  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
  }

  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    const currentWaterLevel = Math.min(leftMax[i], rightMax[i]);
    totalWater += currentWaterLevel - heights[i];
  }

  return totalWater;
};
