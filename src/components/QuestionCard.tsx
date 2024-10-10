import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const QuestionCard: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const currentQuestion = state.questions[state.currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const answers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timeLeft > 0) {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeLeft - 1 });
      } else {
        handleAnswer('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeLeft, dispatch]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    dispatch({ type: 'ANSWER_QUESTION', payload: isCorrect });

    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      dispatch({ type: 'END_GAME' });
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">
          Question {state.currentQuestionIndex + 1}/{state.questions.length}
        </span>
        <span className="text-red-500 font-bold">Time: {state.timeLeft}s</span>
      </div>
      <h2 className="text-xl font-semibold" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      <div className="space-y-2">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            onClick={() => handleAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;