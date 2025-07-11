import { GameConfig, Circle } from '@/hooks/usespot';
import confetti from 'canvas-confetti';

interface HandleCanvasClickProps {
  e: React.MouseEvent<HTMLCanvasElement>;
  canvas: HTMLCanvasElement;
  config: GameConfig;
  found: number[];
  setFound: React.Dispatch<React.SetStateAction<number[]>>;
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
  setIncorrectClicks: React.Dispatch<React.SetStateAction<number>>;
  circleId: React.MutableRefObject<number>;
}

export const runConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};

export const handleCanvasClick = ({
  e,
  canvas,
  config,
  found,
  setFound,
  setCircles,
  setIncorrectClicks,
  circleId,
}: HandleCanvasClickProps) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const newId = circleId.current++;
  setCircles((prev) => [
    ...prev,
    { x: clickX, y: clickY, status: 'pending', id: newId },
  ]);

  let isCorrect = false;
  let foundIndex = -1;

  config.differences.forEach((diff, idx) => {
    if (!found.includes(idx)) {
      if (
        clickX >= diff.x &&
        clickX <= diff.x + diff.width &&
        clickY >= diff.y &&
        clickY <= diff.y + diff.height
      ) {
        isCorrect = true;
        foundIndex = idx;
      }
    }
  });

  if (isCorrect && foundIndex !== -1) {
    setTimeout(() => {
      setCircles((prev) =>
        prev.map((c) => (c.id === newId ? { ...c, status: 'correct' } : c))
      );
      setFound((prev) => [...prev, foundIndex]);
    }, 500);
  } else {
    setIncorrectClicks((prev) => prev + 1);
    setTimeout(() => {
      setCircles((prev) => prev.filter((c) => c.id !== newId));
    }, 1000);
  }
};

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
