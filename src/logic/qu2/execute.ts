import { BowlingFrames, FINAL_FRAME, FinalFrame, NOT_THROW_BASE_SCORE, NEXT_FRAME, RegularFrame, SPARE_BASE_SCORE, STRIKE_BASE_SCORE, FIRST_FRAME } from "./constants";

/**
 * 各フレームのスコア計算をする
 * @param {RegularFrame | FinalFrame} frame 各フレームのスコア
 * @param {number} index 現フレーム
 * @param {BowlingFrames} frames すべてのフレームのスコア
 * @returns {number} 現フレームのみのスコア
 */
const scoreCalculationOfFrame = (frame: RegularFrame | FinalFrame, index: number, frames: BowlingFrames): number => {
  const [firstThrow, secondThrow, thirdThrow] = frame;

  if (index === FINAL_FRAME) {
    return firstThrow + secondThrow + (thirdThrow ?? NOT_THROW_BASE_SCORE);
  }

  const nextFrameIndex = index + NEXT_FRAME;
  const [nextFrameFirstThrow, nextFrameSecondThrow] = frames[nextFrameIndex];
  const getSecondBonusScore = () => {
    if (nextFrameIndex === FINAL_FRAME) {
      return nextFrameSecondThrow;
    }
    const [afterNextFrameFirstThrow] = frames[nextFrameIndex + NEXT_FRAME];
    return isStrike(nextFrameFirstThrow) ? afterNextFrameFirstThrow : nextFrameSecondThrow;
  };
  if (isStrike(firstThrow)) {
    const secondBonusScore = getSecondBonusScore();
    return STRIKE_BASE_SCORE + nextFrameFirstThrow + secondBonusScore;
  }
  if (isSpare(firstThrow, secondThrow)) {
    return SPARE_BASE_SCORE + nextFrameFirstThrow;
  }

  return firstThrow + secondThrow;
};

/**
 * 各フレームの1投目のスコアを見てストライクを判定する
 * @param {number} firstThrow 各フレームの1投目のスコア
 * @returns {boolean} ストライクかどうか
 */
const isStrike = (firstThrow: number): boolean => {
  return firstThrow === STRIKE_BASE_SCORE;
};

/**
 * 各フレームのスコアを見てスペアを判定する
 * @param {number} firstThrow 各フレームの1投目のスコア
 * @param {number} secondThrow 各フレームの2投目スコア
 * @returns {boolean} スペアかどうか
 */
const isSpare = (firstThrow: number, secondThrow: number): boolean => {
  return firstThrow + secondThrow === SPARE_BASE_SCORE;
};

/**
 * @param {BowlingFrames} frames 1ゲームの全フレームの配列
 * @returns {Array<number>} 各フレームのスコア
 */
export const main = (frames: BowlingFrames): Array<number> => {
  return frames.reduce((scores, frame, index) => {
    const score = scoreCalculationOfFrame(frame, index, frames);
    if (index === FIRST_FRAME) {
      return [score];
    }
    const [latestScore] = [...scores].reverse();
    return [...scores, latestScore + score];
  }, [] as number[]);
};
