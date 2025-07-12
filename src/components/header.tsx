'use client';

import Timer from './timer';
import ProgressBar from './progressbar';

type Props = {
  gameTitle: string;
  timeLeft: number;
  totalTime?: number;
  foundCount: number;
  totalDifferences: number;
};

export default function GameHeader({
  gameTitle,
  timeLeft,
  foundCount,
  totalDifferences,
}: Props) {
  return (
    <header className="mb-6 md:mt-0 mt-10 text-center w-5/6 mx-auto">
      <h1 className="text-2xl md:text-4xl font-extrabold items-center tracking-wide my-4 text-yellow-400">
        {gameTitle}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:w-5/6 w-full">
      <div className='flex gap-4'>
        <div
          className={`
            text-2xl 
            bg-yellow-500 p-3 text-white
            font-semibold 
            tracking-wide
            rounded-lg px-4 py-2 font-arcade
          `}
        >
          Score: 
          {foundCount}
        </div>

        <Timer
          timeLeft={timeLeft}
          setTimeLeft={() => {}}
          onTimeUp={() => {}}
          isRunning={true}
        />
        </div>

        <ProgressBar foundCount={foundCount} totalDifferences={totalDifferences} />

        
      </div>
    </header>
  );
}
