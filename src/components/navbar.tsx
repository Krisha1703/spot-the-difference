import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <header className="w-full shadow-md py-4 px-8 flex justify-between items-center">
        
        <Link href="/">
          <motion.h1
            className="text-3xl font-bold text-yellow-500 cursor-pointer"
            whileHover={{  scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            Spot The Difference
          </motion.h1>
        </Link>

        <nav>
          <ul className="flex space-x-4 text-white">
            {[
              { name: 'Config', href: '/config', color: 'bg-pink-500 hover:bg-pink-400' },
              { name: 'Play', href: '/game', color: 'bg-green-500 hover:bg-green-400' },
            ].map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ 
                  scale: 1.07,
                  y: [-2, -6, -2],  
                  rotate: [0, 3, -3, 0],  
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut",
                  times: [0, 0.5, 0.8, 1],
                  repeat: 0
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`${item.color} px-4 py-2 rounded-full text-lg font-semibold transition`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
      </header>
  )
}

export default Navbar