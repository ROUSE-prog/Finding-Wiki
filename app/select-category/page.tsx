'use client';

import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { label: 'Science', wikiCategory: 'Science' },
  { label: 'History', wikiCategory: 'History' },
  { label: 'Technology', wikiCategory: 'Technology' },
  { label: 'Art', wikiCategory: 'Art' },
  { label: 'Geography', wikiCategory: 'Geography' },
];

export default function SelectCategory() {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/game?category=${category}`); // Pass category as a query parameter
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Select a Category</h1>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleCategorySelect(cat.wikiCategory)}
            className="px-6 py-3 bg-cyan-900 bg-opacity-50 text-white rounded hover:bg-cyan-700"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
