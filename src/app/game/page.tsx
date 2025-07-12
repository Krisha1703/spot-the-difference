'use client';

import GameHeader from '@/components/header';
import GameImages from '@/components/images';
import ResultModal from '@/components/result';
import { useSpotGame, Difference } from '@/hooks/usespot';
import { useRef } from 'react';
import Navbar from '@/components/navbar';

export default function Game() {
  const {
    config,
    found,
    incorrectClicks,
    circles,
    timeLeft,
    showResult,
    timeTaken,
    handleClick,
    restartGame,
    getStars,
  } = useSpotGame();

  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex flex-col items-center justify-center p-4 relative">
      <Navbar />

      {config?.differences && (
        <GameHeader
          gameTitle={config?.gameTitle || 'Loading...'}
          timeLeft={timeLeft}
          foundCount={found.length}
          totalDifferences={config.differences.length}
        />
      )}

      {config?.images && (
        <GameImages
          image1={config.images.image1}
          image2={config.images.image2}
          handleClick={handleClick}
          canvas1Ref={canvas1Ref}
          canvas2Ref={canvas2Ref}
          differences={config.differences as Difference[]}
          circles={circles}
        />
      )}

      <ResultModal
        show={showResult}
        found={found.length}
        total={config?.differences.length || 0}
        incorrect={incorrectClicks}
        timeTaken={timeTaken}
        getStars={getStars}
        restartGame={restartGame}
      />
    </main>
  );
}
