import {
  BowlingFrames,
  FIRST_THROW,
  SECOND_THROW,
  SPARE_BASE_SCORE,
  STRIKE_BASE_SCORE,
  THIRD_THROW,
} from './constants';

/**
 * @param {BowlingFrames} frames 1ゲームの全フレームの配列
 * @returns {Array<number>} 各フレームのスコア
 */
export const main = (frames: BowlingFrames): Array<number> => {
  const scoreList: number[] = [];
  const bonusStatus = {
    remainingStrike: {
      '1duration': false,
      '2duration': false,
    },
    remainingSpare: false,
  };

  const applyBonus = (
    knockedPins: number,
    currentFrameTimes: number,
    throwTimes: number
  ) => {
    // 一フレーム目の場合
    if (currentFrameTimes === 0) return;

    // 一投目の場合の判定
    if (throwTimes === FIRST_THROW) {
      if (bonusStatus.remainingStrike['1duration']) {
        scoreList[currentFrameTimes - 2] += knockedPins;
        bonusStatus.remainingStrike['1duration'] = false;
      }
      if (bonusStatus.remainingSpare) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingSpare = false;
      }
      if (bonusStatus.remainingStrike['2duration']) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingStrike['2duration'] = false;
        bonusStatus.remainingStrike['1duration'] = true;
      }
      return;
    }

    // 二投目の場合の判定
    if (throwTimes === SECOND_THROW) {
      if (bonusStatus.remainingStrike['1duration']) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingStrike['1duration'] = false;
      }
      return;
    }
  };

  const applyBonusForFinal = (
    knockedPins: number,
    currentFrameTimes: number,
    throwTimes: number
  ) => {
    // 三投目の場合の判定
    if (throwTimes === THIRD_THROW) return;

    // 二投目の場合の判定
    if (throwTimes === SECOND_THROW) {
      if (bonusStatus.remainingStrike['1duration']) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingStrike['1duration'] = false;
      }
      return;
    }

    // 一投目の場合の判定
    if (throwTimes === FIRST_THROW) {
      if (bonusStatus.remainingStrike['1duration']) {
        scoreList[currentFrameTimes - 2] += knockedPins;
        bonusStatus.remainingStrike['1duration'] = false;
      }
      if (bonusStatus.remainingSpare) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingSpare = false;
      }
      if (bonusStatus.remainingStrike['2duration']) {
        scoreList[currentFrameTimes - 1] += knockedPins;
        bonusStatus.remainingStrike['2duration'] = false;
        bonusStatus.remainingStrike['1duration'] = true;
      }
      return;
    }
  };

  // 1フレームずつ判定
  for (let i = 0; i < frames.length; i++) {
    const currentFrame = frames[i];

    // 最終フレームの場合の判定
    if (currentFrame.length === 3) {
      const knockedPinSum = currentFrame[0] + currentFrame[1] + currentFrame[2];
      scoreList.push(knockedPinSum);

      currentFrame.forEach((frame, index) =>
        applyBonusForFinal(frame, i, index)
      );
      break;
    }

    const knockedPinSum = currentFrame[0] + currentFrame[1];
    scoreList.push(knockedPinSum);

    applyBonus(currentFrame[0], i, FIRST_THROW);
    if (currentFrame[0] === STRIKE_BASE_SCORE) {
      bonusStatus.remainingStrike['2duration'] = true;
      continue;
    }

    applyBonus(currentFrame[1], i, SECOND_THROW);
    if (knockedPinSum === SPARE_BASE_SCORE) bonusStatus.remainingSpare = true;
  }

  // 各回の得点を保持しておく配列を作って、その配列から実際の結果を計算する関数を作る
  const getResult = (frameScores: number[]): number[] => {
    let tmpScore = 0;
    const result: number[] = [];

    for (const score of frameScores) {
      result.push((tmpScore += score));
    }

    return result;
  };

  return getResult(scoreList);
};

main([
  [7, 3],
  [9, 0],
  [10, 0],
  [8, 2],
  [10, 0],
  [10, 0],
  [9, 1],
  [10, 0],
  [10, 0],
  [10, 8, 1],
]);
