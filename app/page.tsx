'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image for optimized SVG rendering
import FindingWikiLogo from '/public/Finding Wiki.svg'; // Update path to your SVG

export default function Home() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/select-category');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-zinc-100 to-teal-100">
      {/* Title Image */}
      <div className="mb-6">
      <Image
  src={FindingWikiLogo}
  alt="Finding Wiki"
  width={400} // Set a fixed width
  height={100} // Set a fixed height
  priority
/>


      </div>

      {/* Description */}
      <p className="text-lg text-center px-4 mb-6">
        Navigate from one Wikipedia page to another in the fewest clicks possible!
      </p>

      {/* Start Game Button */}
      <button
        onClick={handleStartGame}
        className="px-6 py-3 bg-cyan-900 bg-opacity-50 text-white text-lg rounded hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-400"
      >
        Start Game
      </button>
    </div>
  );
}
