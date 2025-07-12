import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
        className="flex-1 flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 8 }}
        >
          Can You Spot All the Differences?
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl max-w-xl text-purple-100 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Test your eyes and find all the hidden surprises. A fun way to play and learn!
        </motion.p>

        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 5, -5, 0],
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/game"
            className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-xl font-bold rounded-full shadow-lg transition duration-300 text-black"
          >
            Start Game
          </Link>
        </motion.div>
    </motion.section>
  )
}

export default Hero