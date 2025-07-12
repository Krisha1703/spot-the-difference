'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

type Coords = {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
};

type Difference = {
  object: string;
  desktop: Coords;
  mobile: Coords;
};

type GameConfig = {
  gameTitle: string;
  images: {
    image1: string;
    image2: string;
  };
  differences: Difference[];
};

export default function ConfigPage() {
  const [config, setConfig] = useState<GameConfig>({
    gameTitle: 'Spot the Difference - Demo',
    images: { image1: '', image2: '' },
    differences: [],
  });

  const router = useRouter();

  useEffect(() => {
    const localConfig = localStorage.getItem('gameConfig');
    if (localConfig) {
      setConfig(JSON.parse(localConfig));
    } else {
      fetch('/config.json')
        .then((res) => res.json())
        .then((data) => setConfig(data));
    }
  }, []);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: 'image1' | 'image2'
  ) => {
    setConfig({
      ...config,
      images: { ...config.images, [key]: e.target.value },
    });
  };

  const handleDifferenceChange = (
    index: number,
    field: keyof Difference | keyof Coords,
    value: string | number,
    mode: 'desktop' | 'mobile' | null = null
  ) => {
    const updatedDiffs = [...config.differences];
    if (mode) {
      updatedDiffs[index][mode][field as keyof Coords] = Number(value);
    } else if (field === 'object') {
      updatedDiffs[index].object = String(value);
    }
    setConfig({ ...config, differences: updatedDiffs });
  };

  const addDifference = () => {
    setConfig({
      ...config,
      differences: [
        ...config.differences,
        {
          object: '',
          desktop: { xPercent: 0, yPercent: 0, widthPercent: 10, heightPercent: 10 },
          mobile: { xPercent: 0, yPercent: 0, widthPercent: 10, heightPercent: 10 },
        },
      ],
    });
  };

  const removeDifference = (index: number) => {
    const updatedDiffs = [...config.differences];
    updatedDiffs.splice(index, 1);
    setConfig({ ...config, differences: updatedDiffs });
  };

  const handleSave = () => {
    localStorage.setItem('gameConfig', JSON.stringify(config));
    alert('✅ Configuration saved to localStorage!');
  };

  const goBackToGame = () => {
    router.push('/');
  };

  return (
    <div className='bg-gradient-to-br from-purple-900 to-blue-900'>
      <Navbar />
     <main
        className="
          max-w-3xl mx-auto p-8 mt-8 rounded-lg
          bg-white/10 
          backdrop-blur-md 
          border border-white/20
          shadow-lg
          text-yellow-200
          "
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">
          Configure Game
        </h1>

        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-yellow-400">Game Info:</h2>

        <label className="block mb-2 font-semibold text-yellow-300">Game Title:</label>
        <input
          type="text"
          value={config.gameTitle}
          onChange={(e) => setConfig({ ...config, gameTitle: e.target.value })}
          className="
            border border-yellow-400 
            bg-white/20 
            rounded px-3 py-2 mb-4 w-full 
            text-yellow-100 placeholder-yellow-400
            focus:outline-none focus:ring-2 focus:ring-yellow-300
            transition
          "
          placeholder="Enter game title"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-yellow-300">Image 1 URL:</label>
            <input
              type="text"
              value={config.images.image1}
              onChange={(e) => handleImageChange(e, 'image1')}
              className="
                border border-yellow-400 
                bg-white/20 
                rounded px-3 py-2 mb-4 w-full 
                text-yellow-100 placeholder-yellow-400
                focus:outline-none focus:ring-2 focus:ring-yellow-300
                transition
              "
              placeholder="Enter URL for image 1"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-yellow-300">Image 2 URL:</label>
            <input
              type="text"
              value={config.images.image2}
              onChange={(e) => handleImageChange(e, 'image2')}
              className="
                border border-yellow-400 
                bg-white/20 
                rounded px-3 py-2 mb-4 w-full 
                text-yellow-100 placeholder-yellow-400
                focus:outline-none focus:ring-2 focus:ring-yellow-300
                transition
              "
              placeholder="Enter URL for image 2"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-yellow-400">Differences:</h2>

        {config.differences.length === 0 && (
          <p className="text-yellow-300 mb-4">No differences added yet. Add one below!</p>
        )}

        {config.differences.map((diff, idx) => (
          <div
            key={idx}
            className="
              border border-yellow-600 p-4 mb-4 rounded 
              bg-white/10 
              shadow-inner
              "
          >
            <label className="block mb-2 font-semibold text-yellow-300">Object:</label>
            <input
              type="text"
              value={diff.object}
              onChange={(e) => handleDifferenceChange(idx, 'object', e.target.value)}
              className="
                border border-yellow-400 
                bg-white/20 
                rounded px-3 py-2 mb-4 w-full 
                text-yellow-100 placeholder-yellow-400
                focus:outline-none focus:ring-2 focus:ring-yellow-300
                transition
              "
              placeholder="Name of the object"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {['xPercent', 'yPercent', 'widthPercent', 'heightPercent'].map((field) => (
                <div key={`desktop-${field}`}>
                  <label className="block text-sm font-medium mb-1 text-yellow-300">
                    Desktop {field}:
                  </label>
                  <input
                    type="number"
                    value={diff.desktop[field as keyof Coords]}
                    onChange={(e) =>
                      handleDifferenceChange(idx, field as keyof Coords, e.target.value, 'desktop')
                    }
                   className="
                    border border-yellow-400 
                    bg-white/20 
                    rounded px-3 py-2 mb-4 w-full 
                    text-yellow-100 placeholder-yellow-400
                    focus:outline-none focus:ring-2 focus:ring-yellow-300
                    transition
                  "
                    min={0}
                    max={100}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['xPercent', 'yPercent', 'widthPercent', 'heightPercent'].map((field) => (
                <div key={`mobile-${field}`}>
                  <label className="block text-sm font-medium mb-1 text-yellow-300">
                    Mobile {field}:
                  </label>
                  <input
                    type="number"
                    value={diff.mobile[field as keyof Coords]}
                    onChange={(e) =>
                      handleDifferenceChange(idx, field as keyof Coords, e.target.value, 'mobile')
                    }
                    className="
                      border border-yellow-400 
                      bg-white/20 
                      rounded px-3 py-2 mb-4 w-full 
                      text-yellow-100 placeholder-yellow-400
                      focus:outline-none focus:ring-2 focus:ring-yellow-300
                      transition
                    "
                    min={0}
                    max={100}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => removeDifference(idx)}
              className="mt-4 bg-yellow-500 cursor-pointer text-white font-semibold text-sm px-4 py-2 rounded-md"
            >
              Remove Difference
            </button>
          </div>
        ))}

        <button
          onClick={addDifference}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-6 transition-colors duration-300"
        >
          Add Difference
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 font-semibold transition-colors duration-300"
          >
            Save Configuration
          </button>
          <button
            onClick={goBackToGame}
            className="flex-1 px-6 py-3 bg-gray-700 text-yellow-300 rounded hover:bg-gray-600 font-semibold transition-colors duration-300"
          >
            Back to Game
          </button>
        </div>
      </main>
    </div>
  );
}
