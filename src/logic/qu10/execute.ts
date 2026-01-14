
/**
 * 地形の高さマップを受け取り、溜まる雨水の総量を計算します。
 *
 * @param heights 各柱の高さを表す配列
 * @returns 溜まった水の総量
 * @throws {Error} 負の高さが含まれている場合
 */
export const main = (heights: number[]): number => {
  heights.forEach((num) => {
    if (num < 0) {
      throw new Error(`Invalid height value: ${num}. Height must be non-negative.`);
    }
  });
  const [max] = [...heights].sort((a, b) => b - a);
  let amountWater = 0;
  for (let i = 0; i < max; i++) {
    let water = 0;
    let wall = false;
    for (let j = 0; j < heights.length; j++) {
      const current = heights[j] - i;
      if (wall && current <= 0) {
        water++;
      } else {
        wall = current > 0;
        amountWater += water;
        water = 0;
      }
    }
  };
  return amountWater;
};
