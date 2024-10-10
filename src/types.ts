export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface GameState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
}

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export type GameAction =
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'NEXT_QUESTION' }
  | { type: 'ANSWER_QUESTION'; payload: boolean }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'END_GAME' };

export interface Category {
  id: number;
  name: string;
}