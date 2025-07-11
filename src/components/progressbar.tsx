'use client';

interface ProgressBarProps {
  foundCount: number;
  totalDifferences: number;
}

export default function ProgressBar({ foundCount, totalDifferences }: ProgressBarProps) {
  const percent = Math.min((foundCount / totalDifferences) * 100, 100);

  return (
    <div className="w-full max-w-xl h-4 bg-gray-300 rounded overflow-hidden mb-4">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
