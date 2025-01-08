'use client';

import React, { useEffect } from 'react';

interface MainContentProps {
  htmlContent: string | null;
  handleLinkClick: (link: string) => void;
  setHeadings: (headings: { id: string; text: string }[]) => void;
  error: string | null;
}

export default function MainContent({
  htmlContent,
  handleLinkClick,
  setHeadings,
  error,
}: MainContentProps) {
  useEffect(() => {
    // Remove title attributes to suppress tooltips
    const elementsWithTitle = document.querySelectorAll('[title]');
    elementsWithTitle.forEach((element) => {
      element.removeAttribute('title');
    });
  }, [htmlContent]);

  useEffect(() => {
    if (!htmlContent) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const extractedHeadings = Array.from(tempDiv.querySelectorAll('h2, h3')).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id; // Assign unique IDs for scrolling
      return { id, text: heading.textContent || '' };
    });

    setHeadings(extractedHeadings); // Share headings with parent
  }, [htmlContent, setHeadings]);

  return (
    <main className="max-w-screen-lg mx-auto mt-4 px-4 ">
      <div className="p-6 border border-gray-300 shadow-lg rounded-md">
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
    </main>
  );
}
