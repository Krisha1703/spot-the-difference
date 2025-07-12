'use client';

import Hero from '@/components/hero';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-blue-900 text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />
      

      {/* Footer */}
      <footer className="w-full text-center py-4 text-purple-100 text-sm">
        &copy; {new Date().getFullYear()} Spot The Difference Game
      </footer>
    </main>
  );
}
