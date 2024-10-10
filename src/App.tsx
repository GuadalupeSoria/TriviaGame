import React from 'react';
import { GameProvider, useGameContext } from './context/GameContext';
import CategorySelector from './components/CategorySelector';
import QuestionCard from './components/QuestionCard';
import ScoreBoard from './components/ScoreBoard';
import { Brain } from 'lucide-react';

const GameContent: React.FC = () => {
  const { state } = useGameContext();

  return (
    <div className="max-w-lg w-full space-y-6">
      {state.questions.length === 0 ? (
        <CategorySelector />
      ) : state.gameOver ? (
        <ScoreBoard />
      ) : (
        <QuestionCard />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-white mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Trivia Game</h1>
        <p className="text-xl text-white">Test your knowledge!</p>
      </div>
      <GameContent />
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
};

export default AppWrapper;