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
  handleSearch: (searchTerm: string) => void;
}

export default function Header({
  category,
  currentPage,
  targetPage,
  clickCount,
  timer,
  handleRestart,
  handleSearch,
}: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = () => {
    handleSearch(searchTerm);
    setIsSearchVisible(false); // Close search box after submitting
  };

  const handleSearchClose = () => {
    setSearchTerm('');
    setIsSearchVisible(false);
  };

  return (
    <>
      <header className="bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Home Icon */}
          <Link href="/" passHref>
            <button className="p-2 rounded hover:bg-gray-200">
              <span className="sr-only">Home</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-9m0 0l9 9m-9-9v18"
                />
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
          {/* Magnifying Glass Icon */}
          <button
            onClick={() => setIsSearchVisible(true)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Search Box */}
          {isSearchVisible && (
            <div className="absolute top-10 right-0 bg-white shadow-md p-2 rounded flex items-center space-x-2">
              <input
                type="text"
                placeholder="Find in article"
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearchSubmit}
                className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
              >
                Find
              </button>
              <button
                onClick={handleSearchClose}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md text-xs hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          )}

          {/* Category Button */}
          <Link href="/select-category" passHref>
            <button className="px-4 py-2 bg-stone-300 text-black text-sm rounded hover:bg-stone-400">
              Category
            </button>
          </Link>

          {/* Reset Button */}
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-stone-500 text-white text-sm rounded hover:bg-stone-600"
          >
            Reset Game
          </button>
        </div>
      </header>

      {/* Current Page Title */}
      <div className="bg-gray-50 text-gray-700 text-center py-2 sticky top-[30px] z-40 shadow-sm border-b border-gray-300">
        <h2 className="text-md sm:text-lg font-semibold">Current Page: {currentPage}</h2>
      </div>
    </>
  );
}
