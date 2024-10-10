import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { useGameContext } from '../context/GameContext';

const CategorySelector: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useGameContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories. Please try again.');
      }
    };
    fetchCategories();
  }, []);

  const handleStartGame = async () => {
    setError(null);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('No results found');
      }

      dispatch({ type: 'SET_QUESTIONS', payload: data.results });
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Error fetching questions. Please try again or select a different category.');
    }
  };

  return (
    <div className="space-y-4">
      <select
        className="w-full p-2 border rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
      >
        <option value={0}>Any Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="w-full p-2 border rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        onClick={handleStartGame}
      >
        Start Game
      </button>
      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}
    </div>
  );
};

export default CategorySelector;