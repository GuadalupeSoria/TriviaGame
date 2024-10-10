import React, { createContext, useContext, useReducer } from 'react';
import { GameState, GameAction, GameContextType } from '../types';

const initialState: GameState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 30,
  gameOver: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, gameOver: false, currentQuestionIndex: 0, score: 0 };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeLeft: 30,
      };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        score: action.payload ? state.score + 1 : state.score,
      };
    case 'UPDATE_TIME':
      return { ...state, timeLeft: action.payload };
    case 'END_GAME':
      return { ...state, gameOver: true };
    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};