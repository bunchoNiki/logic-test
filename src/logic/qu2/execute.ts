import { BowlingFrames } from "./constants";


/**
 * @param {BowlingFrames} frames 1ゲームの全フレームの配列
 * @returns {Array<number>} 各フレームのスコア
 */
export const main = (frames: BowlingFrames): Array<number> => {
const pointsPerFrame = [];

  for (let i = 0; i < 9; i++) {
    const frame = frames[i];
    const throw1 = frame[0];
    const throw2 = frame[1];

    const isStrike = throw1 === 10;
    const isSpare = !isStrike && throw1 + throw2 === 10;

    if (isStrike) {
      const nextFrame = frames[i + 1];
      const nextThrow1 = nextFrame[0];
      const nextThrow2 = nextFrame[1];

      let strikeBonus = 0;
      if (nextThrow1 === 10) {
        if (i === 8) {
          strikeBonus = nextThrow1 + nextThrow2;
        } else {
          const frameAfterNext = frames[i + 2];
          strikeBonus = 10 + frameAfterNext[0];
        }
      } else {
        strikeBonus = nextThrow1 + nextThrow2;
      }
      pointsPerFrame.push(10 + strikeBonus);

    } else if (isSpare) {
      const nextFrame = frames[i + 1];
      const spareBonus = nextFrame[0];
      pointsPerFrame.push(10 + spareBonus);

    } else {
      pointsPerFrame.push(throw1 + throw2);
    }
  }

  const lastFrame = frames[9];
  const lastFramePoints = lastFrame[0] + lastFrame[1];
  pointsPerFrame.push(lastFramePoints);

  const cumulativeScores = [];
  let totalScore = 0;
  for (let i = 0; i < pointsPerFrame.length; i++) {
    totalScore += pointsPerFrame[i];
    cumulativeScores.push(totalScore);
  }

  return cumulativeScores;
};
