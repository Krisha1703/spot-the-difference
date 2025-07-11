'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Difference = {
  x: number;
  y: number;
  width: number;
  height: number;
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
    images: {
      image1: '',
      image2: '',
    },
    differences: [],
  });

  const router = useRouter();

  // Load config from localStorage OR fallback to config.json
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
    field: keyof Difference,
    value: number
  ) => {
    const updatedDiffs = [...config.differences];
    updatedDiffs[index][field] = value;
    setConfig({ ...config, differences: updatedDiffs });
  };

  const addDifference = () => {
    setConfig({
      ...config,
      differences: [...config.differences, { x: 0, y: 0, width: 50, height: 50 }],
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
    <main className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-bold mb-6 text-center">⚙️ Configure Game</h1>

      <label className="block mb-2 font-semibold">Game Title:</label>
      <input
        type="text"
        value={config.gameTitle}
        onChange={(e) => setConfig({ ...config, gameTitle: e.target.value })}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Image 1 URL:</label>
          <input
            type="text"
            value={config.images.image1}
            onChange={(e) => handleImageChange(e, 'image1')}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Image 2 URL:</label>
          <input
            type="text"
            value={config.images.image2}
            onChange={(e) => handleImageChange(e, 'image2')}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Differences:</h2>

      {config.differences.length === 0 && (
        <p className="text-gray-600 mb-4">No differences added yet. Add one below!</p>
      )}

      {config.differences.map((diff, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['x', 'y', 'width', 'height'] as (keyof Difference)[]).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">{field}:</label>
                <input
                  type="number"
                  value={diff[field]}
                  onChange={(e) =>
                    handleDifferenceChange(idx, field, Number(e.target.value))
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => removeDifference(idx)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <button
        onClick={addDifference}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-6"
      >
        ➕ Add Difference
      </button>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          💾 Save Configuration
        </button>

        <button
          onClick={goBackToGame}
          className="flex-1 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          🔙 Back to Game
        </button>
      </div>
    </main>
  );
}
