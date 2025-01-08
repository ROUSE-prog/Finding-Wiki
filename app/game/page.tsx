'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import MainContent from '@/components/MainContent';

const POPULAR_ARTICLES = {
  Science: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Earth Science'],
  History: ['World War II', 'Ancient Rome', 'Renaissance', 'French Revolution'],
  Technology: ['Computer Science', 'Internet', 'Blockchain', 'Cybersecurity'],
  Art: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Impressionism'],
  Geography: ['Mount Everest', 'Amazon Rainforest', 'Sahara Desert', 'Pacific Ocean'],
};

export default function Game() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Science';

  const [category, setCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState('');
  const [targetPage, setTargetPage] = useState('');
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  const fetchRandomPages = () => {
    const articles = POPULAR_ARTICLES[category];
    if (!articles || articles.length < 2) {
      setError(`Not enough articles in the ${category} category.`);
      return;
    }

    let newStartPage = articles[Math.floor(Math.random() * articles.length)];
    let newEndPage = articles[Math.floor(Math.random() * articles.length)];
    while (newStartPage === newEndPage) {
      newEndPage = articles[Math.floor(Math.random() * articles.length)];
    }

    setCurrentPage(newStartPage);
    setTargetPage(newEndPage);
    setClickCount(0);
    setHtmlContent(null);
    setError(null);
  };

  useEffect(() => {
    if (!currentPage) return;

    const fetchPageData = async () => {
      try {
        const res = await fetch(`/api/wiki?title=${currentPage}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setHtmlContent(data.html || 'No content available');
        setError(null);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.html || '';

        const extractedHeadings = Array.from(tempDiv.querySelectorAll('h1, h2')).map(
          (heading, index) => {
            const id = `heading-${index}`;
            heading.id = id; // Assign `id` to each heading for navigation
            return { id, text: heading.textContent || '' };
          }
        );
        setHeadings(extractedHeadings);
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError('Failed to load page content. Please try again.');
      }
    };

    fetchPageData();
  }, [currentPage]);

  useEffect(() => {
    fetchRandomPages();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (newPage: string) => {
    setClickCount((prev) => prev + 1);
    setCurrentPage(newPage.replace(/ /g, '_'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    fetchRandomPages();
    setTimer(0);
  };

  const handleNavigationClick = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  


  return (
    <>
  <Header
  category={category}
  currentPage={currentPage}
  targetPage={targetPage}
  clickCount={clickCount}
  timer={timer}
  handleRestart={handleRestart}
  setCategory={setCategory}
  headings={headings}

  onNavigate={handleNavigationClick}
/>

<MainContent
  htmlContent={htmlContent}
  handleLinkClick={handleLinkClick}
  setHeadings={setHeadings} // Sync extracted headings
  error={error}
/>
    </>
  );
}
