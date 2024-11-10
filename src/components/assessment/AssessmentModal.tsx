import React, { useState } from 'react';
import { X, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Question, questions } from './questions';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal = ({ isOpen, onClose }: AssessmentModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQuestions = questions.filter(q => q.difficulty === difficulty);
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Adapt difficulty based on correct answers
    const correctCount = newAnswers.filter(
      (a, i) => a === currentQuestions[i].correctAnswer
    ).length;
    const accuracy = correctCount / newAnswers.length;

    if (accuracy > 0.7) {
      setDifficulty('hard');
    } else if (accuracy < 0.4) {
      setDifficulty('easy');
    } else {
      setDifficulty('medium');
    }

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const score = answers.filter(
    (answer, index) => answer === currentQuestions[index].correctAnswer
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {!completed ? (
          <>
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Smart Assessment
              </h2>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Question {currentQuestion + 1} of {currentQuestions.length}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              You scored {score} out of {currentQuestions.length} questions correctly.
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-indigo-700">
                Based on your performance, we recommend starting with{' '}
                {score > 7 ? 'advanced' : score > 4 ? 'intermediate' : 'beginner'}{' '}
                level courses.
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              Continue to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentModal;