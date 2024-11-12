import React, { useState, useEffect } from 'react';
import { X, Brain, ArrowRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Question, questions } from './questions';
import { useAuth } from '../../contexts/AuthContext';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal = ({ isOpen, onClose }: AssessmentModalProps) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && !completed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, completed, timeLeft]);

  if (!isOpen) return null;

  const currentQuestions = questions.filter(q => q.difficulty === difficulty);
  const question = currentQuestions[currentQuestion];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const scorePercentage = Math.round((score / currentQuestions.length) * 100);

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Smart Assessment
                </h2>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                {formatTime(timeLeft)}
              </div>
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
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {currentQuestions.length}</span>
                <span>Difficulty: {difficulty}</span>
              </div>
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
              You scored {scorePercentage}% ({score} out of {currentQuestions.length} correct)
            </p>
            
            <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-indigo-900 mb-2">Performance Analysis</h3>
              <ul className="space-y-2 text-indigo-700">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Strong performance in: Logic & Problem Solving
                </li>
                <li className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Areas for improvement: Data Structures
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setCompleted(false);
                  setTimeLeft(30 * 60);
                }}
                className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center justify-center"
              >
                Retake Assessment
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentModal;