'use client';

import Timer from './timer';

type Props = {
  gameTitle: string;
  timeLeft: number;
  totalTime?: number; 
};

export default function GameHeader({ gameTitle, timeLeft }: Props) {
  return (
    <header className="mb-6 md:mt-0 mt-10 text-center flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide mb-4">
        {gameTitle}
      </h1>

      <Timer
        timeLeft={timeLeft}
        setTimeLeft={() => {}} 
        onTimeUp={() => {}}    
        isRunning={true}     
      />
    </header>
  );
}
