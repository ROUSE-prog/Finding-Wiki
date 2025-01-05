'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import MainContent from '@/components/MainContent';

// Predefined popular articles by category
const POPULAR_ARTICLES = {
  Science: [
    'Physics',
    'Chemistry',
    'Biology',
    'Astronomy',
    'Earth Science',
    'Quantum Mechanics',
    'Genetics',
    'Artificial Intelligence',
    'Climate Change',
    'Black Hole',
  ],
  History: [
    'World War II',
    'Ancient Rome',
    'Renaissance',
    'French Revolution',
    'Industrial Revolution',
    'American Civil War',
    'Maya Civilization',
    'Napoleon Bonaparte',
    'Great Depression',
    'Cold War',
  ],
  Technology: [
    'Computer Science',
    'Internet',
    'Blockchain',
    'Cybersecurity',
    'Software Engineering',
    'Quantum Computing',
    'Artificial Intelligence',
    'Robotics',
    'Web Development',
    'Machine Learning',
  ],
  Art: [
    'Vincent van Gogh',
    'Leonardo da Vinci',
    'Pablo Picasso',
    'Impressionism',
    'Modern Art',
    'Renaissance Art',
    'Abstract Art',
    'Art Nouveau',
    'Cubism',
    'Surrealism',
  ],
  Geography: [
    'Mount Everest',
    'Amazon Rainforest',
    'Sahara Desert',
    'Pacific Ocean',
    'Grand Canyon',
    'Himalayas',
    'Antarctica',
    'Great Barrier Reef',
    'Andes Mountains',
    'Amazon River',
  ],
};

export default function Game() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Science'; // Get category from query params

  const [category, setCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState('');
  const [targetPage, setTargetPage] = useState('');
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [links, setLinks] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  // Fetch random pages based on the category
  const fetchRandomPages = () => {
    const articles = POPULAR_ARTICLES[category]; // Fetch articles based on the category
    if (!articles || articles.length < 2) {
      setError(`Not enough articles in the ${category} category.`);
      return;
    }

    // Randomly select two different articles
    let newStartPage = articles[Math.floor(Math.random() * articles.length)];
    let newEndPage = articles[Math.floor(Math.random() * articles.length)];
    while (newStartPage === newEndPage) {
      newEndPage = articles[Math.floor(Math.random() * articles.length)];
    }

    setCurrentPage(newStartPage);
    setTargetPage(newEndPage);
    setClickCount(0);
    setHtmlContent(null);
    setLinks([]);
    setError(null);
  };

  // Fetch page data for the current page
  useEffect(() => {
    if (!currentPage) return;

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
  }, [currentPage]);

  // Initialize random pages when the component mounts or category changes
  useEffect(() => {
    fetchRandomPages();
  }, [category]);

  // Timer to track the game's duration
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (newPage: string) => {
    setClickCount((prev) => prev + 1);
    setCurrentPage(newPage.replace(/ /g, '_'));
  };

  const handleRestart = () => {
    fetchRandomPages();
    setTimer(0);
  };

  const handleSearch = (searchTerm: string) => {
    if (!htmlContent) return;

    const highlightedHTML = htmlContent.replace(
      new RegExp(`(${searchTerm})`, 'gi'),
      `<mark class="bg-yellow-200">$1</mark>`
    );

    setHtmlContent(highlightedHTML);
  };

  const handleSearchSubmit = () => {
    console.log('Search initiated');
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
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <MainContent
        htmlContent={htmlContent}
        links={links}
        handleLinkClick={handleLinkClick}
        error={error}
      />
    </>
  );
}
