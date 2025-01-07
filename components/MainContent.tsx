'use client';
import React from 'react';
interface MainContentProps {
  htmlContent: string | null;
  links: string[];
  handleLinkClick: (link: string) => void;
  error: string | null;
}
export default function MainContent({
  htmlContent,
  links,
  handleLinkClick,
  error,
}: MainContentProps) {
  return (
    <main className="max-w-screen-lg mx-auto mt-4 px-4">
      <div className="bg-white p-6 border border-gray-300 shadow-md rounded-md">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'A') {
                e.preventDefault();
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
        <h2 className="text-xl font-semibold mb-2">Links:</h2>
        {links.length > 0 ? (
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => handleLinkClick(link)}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No links available.</p>
        )}
      </div>
    </main>
  );
}