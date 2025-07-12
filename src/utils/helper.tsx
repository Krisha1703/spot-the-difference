import { GameConfig, Circle } from '@/hooks/usespot';
import confetti from 'canvas-confetti';

export const runConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};

export function handleCanvasClick({
  e,
  canvas,
  config,
  found,
  setFound,
  setCircles,
  setIncorrectClicks,
  circleId,
}: {
  e: React.MouseEvent<HTMLCanvasElement>;
  canvas: HTMLCanvasElement;
  config: GameConfig;
  found: number[];
  setFound: React.Dispatch<React.SetStateAction<number[]>>;
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
  setIncorrectClicks: React.Dispatch<React.SetStateAction<number>>;
  circleId: React.MutableRefObject<number>;
}) {
  const rect = canvas.getBoundingClientRect();
  const xClick = ((e.clientX - rect.left) / rect.width) * 100;
  const yClick = ((e.clientY - rect.top) / rect.height) * 100;

  const isMobile = window.innerWidth < 768;

  let foundCorrect = false;

  config.differences.forEach((diff, idx) => {
    if (found.includes(idx)) return;

    const coords = isMobile ? diff.mobile : diff.desktop;

    if (
      xClick >= coords.xPercent &&
      xClick <= coords.xPercent + coords.widthPercent &&
      yClick >= coords.yPercent &&
      yClick <= coords.yPercent + coords.heightPercent
    ) {
      foundCorrect = true;
      setFound((prev) => [...prev, idx]);
      setCircles((prev) => [
        ...prev,
        {
          x: (xClick / 100) * rect.width,
          y: (yClick / 100) * rect.height,
          status: 'correct',
          id: circleId.current++,
        },
      ]);
    }
  });

  if (!foundCorrect) {
    setIncorrectClicks((prev) => prev + 1);
    const tempId = circleId.current++;
    setCircles((prev) => [
      ...prev,
      {
        x: (xClick / 100) * rect.width,
        y: (yClick / 100) * rect.height,
        status: 'pending',
        id: tempId,
      },
    ]);

    setTimeout(() => {
      setCircles((prev) => prev.filter((c) => c.id !== tempId));
    }, 2000);
  }
}


export const shouldFinishGame = (found: number[], totalDifferences?: number) => {
  if (!totalDifferences) return false;
  return found.length === totalDifferences;
};

export const getStars = (foundCount: number, total: number) => {
  const percent = getScorePercent(foundCount, total);
  if (percent >= 67) return 3;
  if (percent >= 34) return 2;
  return 1;
};

export const getScorePercent = (foundCount: number, total: number) => {
  return Math.round((foundCount / (total || 1)) * 100);
};
