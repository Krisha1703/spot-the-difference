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
  const router = useRouter();
  if (!show) return null;

  const percent = Math.round((found / total) * 100);
  const stars = getStars();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative rounded-3xl p-8 w-full max-w-md text-center 
          bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-white mb-2">
          Game Over!
        </h2>
        <p className="text-lg font-semibold mb-6 text-gray-100">
          You scored <span className="text-green-400">{percent}%</span>
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: 3 }).map((_, idx) => {
            const filled = idx < stars;
            return (
              <motion.svg
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 drop-shadow-md ${
                  filled ? 'text-yellow-400' : 'text-gray-400'
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.15, type: 'spring' }}
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </motion.svg>
            );
          })}
        </div>

        {/* Stats */}
        <div className="space-y-2 text-gray-200 text-lg">
          <p>Correct: <span className="font-bold">{found}</span> / {total}</p>
          <p>Incorrect: <span className="font-bold">{incorrect}</span></p>
          <p>Time: <span className="font-bold">{timeTaken}s</span></p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={restartGame}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 
              bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold 
              rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Restart Game
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/config')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 
              bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold 
              rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Game Configuration
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
