'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  category: string;
  currentPage: string;
  targetPage: string;
  clickCount: number;
  timer: number;
  handleRestart: () => void;
  setCategory: (category: string) => void;
  headings: { id: string; text: string }[];
  onNavigate: (id: string) => void;
}

export default function Header({
  category,
  currentPage,
  targetPage,
  clickCount,
  timer,
  handleRestart,
  setCategory,
  headings,
  onNavigate,
}: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavigationClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <>
      <header className="bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Home Button */}
          <Link href="/" passHref>
            <button className="p-2 rounded hover:bg-gray-200">
              <span className="sr-only">Home</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9m0 0l9 9m-9-9v18" />
              </svg>
            </button>
          </Link>

          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Finding Wiki</h1>
        </div>

        {/* Middle Section */}
        <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
          <p>
            Category: <strong>{category}</strong> | Target Page: <strong>{targetPage}</strong> | Clicks: {clickCount} | Time: <strong>{Math.floor(timer / 60)}:{timer % 60}</strong>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {/* Reset Button */}
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-stone-500 text-white text-sm rounded hover:bg-stone-600"
          >
            Reset Game
          </button>

          {/* Category Button */}
          <button
            onClick={() => setCategory('')}
            className="px-4 py-2 bg-stone-300 text-black text-sm rounded hover:bg-stone-400"
          >
            Category
          </button>

          {/* Navigation Toggle */}
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 rounded hover:bg-gray-200">
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12H8m0 6h8" />
            </svg>
          </button>
        </div>
      </header>

      {/* Current Page Container */}
      <div className="bg-gray-50 text-gray-700 text-center py-2 sticky top-[35px] z-40 shadow-sm border-b border-gray-300">
        <h2 className="text-md sm:text-lg font-semibold">
          Current Page: {decodeURIComponent(currentPage).replace(/_/g, ' ')}
        </h2>
      </div>

      {/* Navigation Drawer */}
      {isNavOpen && (
        <aside className="fixed top-16 left-0 z-40 w-64 h-full bg-gray-50 border-r border-gray-300 shadow-md overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleNavigationClick(heading.id)}
                    className="text-blue-500 hover:underline"
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
