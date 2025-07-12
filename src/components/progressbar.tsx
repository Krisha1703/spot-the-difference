'use client';

interface ProgressBarProps {
  foundCount: number;
  totalDifferences: number;
}

export default function ProgressBar({ foundCount, totalDifferences }: ProgressBarProps) {
  const percent = Math.min((foundCount / totalDifferences) * 100, 100);

  return (
    <div className="w-full md:max-w-5/6 h-4 md:mt-0 mt-5 bg-gray-300 rounded overflow-hidden mb-0 flex-shrink-0">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
