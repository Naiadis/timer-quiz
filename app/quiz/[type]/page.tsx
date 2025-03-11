"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DigitalTimer from "@/components/digital-timer";
import AnalogueTimer from "@/components/analogue-timer";
import { NextPage } from "next";

interface QuizPageProps {
  params: {
    type: string;
  };
}

// Sample quiz questions and options (placeholder)
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    correctAnswer: 2,
  },
];

const QuizPage: NextPage<QuizPageProps> = ({ params }) => {
  const router = useRouter();
  const quizType = params.type;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(quizQuestions.length).fill(-1)
  );

  const handleOptionClick = (index: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    router.push(`/thank-you?score=${score}&total=${quizQuestions.length}`);
  };

  const renderTimer = () => {
    switch (quizType) {
      case "digital-timer":
        return <DigitalTimer duration={1200} />;
      case "analogue-timer":
        return <AnalogueTimer duration={1200} />;
      default:
        return null;
    }
  };

  const currentQuizData = quizQuestions[currentQuestion];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 relative">
      <div className="absolute top-4 right-4">{renderTimer()}</div>
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-50 text-gray-50 rounded-md hover:bg-gray-50 transition-colors border-0"
        >
          Back to Selection
        </button>
      </div>
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-6">
          {currentQuizData.question}
        </h2>
        <div className="space-y-3">
          {currentQuizData.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                userAnswers[currentQuestion] === index
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md ${
              currentQuestion === 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 transition-colors"
            }`}
          >
            Previous
          </button>
          {currentQuestion < quizQuestions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
