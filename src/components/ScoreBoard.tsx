import React, { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const ScoreBoard: React.FC = () => {
  const { state } = useGameContext();

  useEffect(() => {
    if (state.gameOver) {
      const highScores = JSON.parse(localStorage.getItem('triviaHighScores') || '[]');
      highScores.push(state.score);
      highScores.sort((a: number, b: number) => b - a);
      localStorage.setItem('triviaHighScores', JSON.stringify(highScores.slice(0, 5)));
    }
  }, [state.gameOver, state.score]);

  const getPerformanceMessage = () => {
    const percentage = (state.score / state.questions.length) * 100;
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Great job!";
    if (percentage >= 40) return "Not bad!";
    return "Keep practicing!";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 text-center">
      <h2 className="text-2xl font-bold">Game Over</h2>
      <p className="text-xl">Your Score: {state.score} / {state.questions.length}</p>
      <p className="text-lg">{getPerformanceMessage()}</p>
    </div>
  );
};

export default ScoreBoard;