'use client';

import { useState, useEffect, useRef } from 'react';
import {
  handleCanvasClick,
  shouldFinishGame,
  getStars,
  runConfetti,
  getScorePercent
} from '@/utils/helper';

export type Difference = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameConfig = {
  gameTitle: string;
  images: {
    image1: string;
    image2: string;
  };
  differences: Difference[];
};

export type Circle = {
  x: number;
  y: number;
  status: 'pending' | 'correct';
  id: number;
};

export function useSpotGame() {
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [found, setFound] = useState<number[]>([]);
  const [incorrectClicks, setIncorrectClicks] = useState<number>(0);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const circleId = useRef(0);

  useEffect(() => {
    fetch('/config.json')
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);

  const handleClick = (
    e: React.MouseEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    if (!config || !isRunning) return;

    handleCanvasClick({
      e,
      canvas,
      config,
      found,
      setFound,
      setCircles,
      setIncorrectClicks,
      circleId,
    });
  };

  const finishGame = () => {
    runConfetti();
    setIsRunning(false);
    setTimeTaken(60 - timeLeft);
    setShowResult(true);
  };

  const restartGame = () => {
    setFound([]);
    setIncorrectClicks(0);
    setCircles([]);
    setTimeLeft(60);
    setTimeTaken(0);
    setShowResult(false);
    setIsRunning(true);
  };

  useEffect(() => {
    if (shouldFinishGame(found, config?.differences?.length)) {
      finishGame();
    }
  }, [found]);

  return {
    config,
    found,
    incorrectClicks,
    circles,
    timeLeft,
    isRunning,
    showResult,
    timeTaken,
    handleClick,
    finishGame,
    restartGame,
    getStars: () => getStars(found.length, config?.differences?.length || 0),
    getScorePercent: () => getScorePercent(found.length, config?.differences?.length || 0),
  };
}
