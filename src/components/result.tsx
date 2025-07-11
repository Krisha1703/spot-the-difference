'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Props = {
  show: boolean;
  found: number;
  total: number;
  incorrect: number;
  timeTaken: number;
  getStars: () => number;
  restartGame: () => void;
};

export default function ResultModal({
  show,
  found,
  total,
  incorrect,
  timeTaken,
  getStars,
  restartGame,
}: Props) {
  const router = useRouter();  // ✅ Always runs!

  if (!show) return null;

  const percent = Math.round((found / total) * 100);
  const stars = getStars();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">🎉 Game Over!</h2>
        <p className="text-lg font-semibold mb-6 text-gray-700">
          You scored <span className="text-blue-600">{percent}%</span>
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: 3 }).map((_, idx) => {
            const filled = idx < stars;
            return (
              <motion.svg
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.2, type: 'spring' }}
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </motion.svg>
            );
          })}
        </div>

        {/* Stats */}
        <div className="space-y-2 text-gray-700 text-lg">
          <p>✅ Correct: <span className="font-bold">{found}</span> / {total}</p>
          <p>❌ Incorrect clicks: <span className="font-bold">{incorrect}</span></p>
          <p>⏱️ Time taken: <span className="font-bold">{timeTaken}s</span></p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={restartGame}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            🔄 Restart Game
          </button>

          <button
            onClick={() => router.push('/config')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            ⚙️ Game Configuration
          </button>
        </div>
      </motion.div>
    </div>
  );
}
