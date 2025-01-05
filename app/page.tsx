// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/select-category');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Finding Wiki</h1>
      <p className="text-lg mb-6">
        Navigate from one Wikipedia page to another in the fewest clicks possible!
      </p>
      <button
        onClick={handleStartGame}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>
  );
}
