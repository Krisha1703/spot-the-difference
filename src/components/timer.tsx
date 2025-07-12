'use client';

import { useEffect } from 'react';

type TimerProps = {
  timeLeft: number;
  setTimeLeft: (n: number) => void;
  onTimeUp: () => void;
  isRunning: boolean;
};

export default function Timer({ timeLeft, setTimeLeft, onTimeUp, isRunning }: TimerProps) {
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);

  return (
    <>
      <div
        className={`
          text-2xl 
          bg-red-500 p-3 text-white
          font-semibold 
          tracking-wide
          rounded-lg px-4 py-2 font-arcade
        `}
      >
        Time: 
        {timeLeft}s
      </div>

      {timeLeft <= 3 && (
        <div className="fixed inset-0 z-50 bg-red-600/40 animate-flicker pointer-events-none" />
      )}
    </>
  );
}
