'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Game() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'Science'; // Default to 'Science'
  const [currentPage, setCurrentPage] = useState('');
  const [targetPage, setTargetPage] = useState('');
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [links, setLinks] = useState<string[]>([]); // Ensure this is defined
  const [clickCount, setClickCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000); // Increment every second
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  const fetchRandomPages = async () => {
    try {
      const res = await fetch(`/api/wiki?action=random&category=${category}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Ensure the pages are different
      let [newStartPage, newEndPage] = data.randomPages;
      while (newStartPage === newEndPage) {
        const res = await fetch(`/api/wiki?action=random&category=${category}`);
        const data = await res.json();
        newStartPage = data.randomPages[0];
        newEndPage = data.randomPages[1];
      }

      setCurrentPage(newStartPage);
      setTargetPage(newEndPage);
      setClickCount(0);
      setHtmlContent(null);
      setLinks([]); // Clear links while new content loads
      setError(null);
    } catch (err) {
      console.error('Error fetching random pages:', err);
      setError('Failed to reset the game. Please try again.');
    }
  };

  useEffect(() => {
    if (!currentPage || !targetPage) {
      fetchRandomPages();
    } else {
      const fetchPageData = async () => {
        try {
          const res = await fetch(`/api/wiki?title=${currentPage}`);
          const data = await res.json();
          if (data.error) throw new Error(data.error);

          setHtmlContent(data.html || 'No content available');
          setLinks(data.links || []);
          setError(null);
        } catch (err) {
          console.error('Error fetching page data:', err);
          setError('Failed to load page content. Please try again.');
        }
      };

      fetchPageData();
    }
  }, [currentPage]);

  const handleLinkClick = (newPage: string) => {
    console.log('Navigating to page:', newPage); // Debugging
    setClickCount((prev) => prev + 1);
    setCurrentPage(newPage.replace(/_/g, ' ')); // Ensure proper formatting
  };
  

  const handleRestart = () => {
    fetchRandomPages();
  };

  return (
    <div className="bg-gray-100 min-h-screen">


   <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
  <div className="max-w-screen-md mx-auto px-3 py-3 text-center sm:text-center">
    <h1 className="text-2xl sm:text-1xl font-bold">Finding Wiki</h1>
    
    <p className="text-md mt-2">
      <strong>Time:</strong> {Math.floor(timer / 60)}:{timer % 60}
    </p>
  </div>
  <div className="max-w-screen-lg mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
    <div className="text-center sm:text-left">
      <p className="text-sm sm:text-base text-gray-600">
        Category: <strong>{category}</strong> | Current Page: <strong>{currentPage}</strong> | Target Page: <strong>{targetPage}</strong> | Clicks: {clickCount}
      </p>
    </div>
    <button
      onClick={handleRestart}
      className="mt-2 sm:mt-0 px-4 py-2 bg-stone-500 text-white text-sm rounded hover:bg-stone-600"
    >
      Reset Game
    </button>
  </div>
</header>



<main className="max-w-screen-lg mx-auto mt-4 px-4">
  <div
    className={`bg-white p-4 border border-gray-300 shadow-md rounded-md prose max-w-none transition-opacity duration-500 ${
      htmlContent ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {error ? (
      <p className="text-red-500 text-sm">{error}</p>
    ) : (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'A') {
            e.preventDefault(); // Prevent browser navigation
            const link = target.getAttribute('href') || '';
            if (link.startsWith('/wiki/')) {
              const newPage = link.replace('/wiki/', '').replace(/_/g, ' ');
              handleLinkClick(newPage);
            }
          }
        }}
      />
    )}
  </div>
  <div className="mt-4">
    <h2 className="text-lg font-semibold mb-1">Links:</h2>
    {links.length > 0 ? (
      <ul className="list-disc pl-5 space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <button
              onClick={() => handleLinkClick(link)}
              className="text-blue-500 underline hover:text-blue-700 text-sm"
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm">No links available.</p>
    )}
  </div>
</main>



    </div>
  );
}
