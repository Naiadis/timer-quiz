"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import DigitalTimer from "@/components/digital-timer";
import AnalogueTimer from "@/components/analogue-timer";
import React from "react";

// Updated quiz questions from general knowledge quiz
const quizQuestions = [
  {
    question: "Which ancient wonder was located in Alexandria, Egypt?",
    options: [
      "Hanging Gardens",
      "Colossus of Rhodes",
      "Lighthouse (Pharos)",
      "Temple of Artemis",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Ge"],
    correctAnswer: 0,
  },
  {
    question: 'Who wrote the novel "1984"?',
    options: [
      "Aldous Huxley",
      "George Orwell",
      "Ray Bradbury",
      "Kurt Vonnegut",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which mountain range separates Europe from Asia?",
    options: ["Alps", "Andes", "Himalayas", "Urals"],
    correctAnswer: 3,
  },
  {
    question: "What is the capital of New Zealand?",
    options: ["Auckland", "Wellington", "Christchurch", "Sydney"],
    correctAnswer: 1,
  },
  {
    question: "Which planet has the Great Red Spot?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: 2,
  },
  {
    question: 'Who painted "Starry Night"?',
    options: [
      "Pablo Picasso",
      "Claude Monet",
      "Vincent van Gogh",
      "Leonardo da Vinci",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Lungs", "Skin"],
    correctAnswer: 3,
  },
  {
    question: "Which country was the first to reach the South Pole?",
    options: ["United States", "Norway", "United Kingdom", "Russia"],
    correctAnswer: 1,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1,
  },
  {
    question: 'Who composed the "Moonlight Sonata"?',
    options: ["Mozart", "Bach", "Beethoven", "Chopin"],
    correctAnswer: 2,
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correctAnswer: 1,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: 2,
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which country has the largest population in the world?",
    options: ["India", "United States", "China", "Indonesia"],
    correctAnswer: 0,
  },
  {
    question: "What year did World War I begin?",
    options: ["1914", "1916", "1918", "1939"],
    correctAnswer: 0,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
  },
  {
    question: "Which of these is not a noble gas?",
    options: ["Neon", "Argon", "Nitrogen", "Helium"],
    correctAnswer: 2,
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    options: [
      "Mother Teresa",
      "Marie Curie",
      "Rosalind Franklin",
      "Dorothy Hodgkin",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
  },
  {
    question: "Which scientist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Stephen Hawking",
      "Niels Bohr",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Buenos Aires"],
    correctAnswer: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Michelangelo",
      "Raphael",
      "Leonardo da Vinci",
      "Sandro Botticelli",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Titanium", "Platinum", "Quartz"],
    correctAnswer: 0,
  },
  {
    question: "Which country was formerly known as Persia?",
    options: ["Iraq", "Turkey", "Iran", "Egypt"],
    correctAnswer: 2,
  },
  {
    question: "What is the main component of the Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    correctAnswer: 3,
  },
  {
    question: 'Who wrote "Pride and Prejudice"?',
    options: [
      "Charlotte Brontë",
      "Virginia Woolf",
      "Emily Dickinson",
      "Jane Austen",
    ],
    correctAnswer: 3,
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    correctAnswer: 1,
  },
  {
    question: "Which instrument did Mozart primarily compose for?",
    options: ["Violin", "Piano", "Flute", "Cello"],
    correctAnswer: 1,
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctAnswer: 1,
  },
  {
    question: "Who discovered penicillin?",
    options: [
      "Louis Pasteur",
      "Alexander Fleming",
      "Marie Curie",
      "Joseph Lister",
    ],
    correctAnswer: 1,
  },
  {
    question: 'Which planet is known as the "Red Planet"?',
    options: ["Venus", "Jupiter", "Mars", "Mercury"],
    correctAnswer: 2,
  },
  {
    question: "In which year did the Berlin Wall fall?",
    options: ["1987", "1989", "1991", "1993"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest species of big cat?",
    options: ["Lion", "Jaguar", "Leopard", "Tiger"],
    correctAnswer: 3,
  },
  {
    question: 'Who wrote "The Great Gatsby"?',
    options: [
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
      "John Steinbeck",
      "Mark Twain",
    ],
    correctAnswer: 1,
  },
  {
    question: 'Which element has the chemical symbol "K"?',
    options: ["Krypton", "Calcium", "Potassium", "Copper"],
    correctAnswer: 2,
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctAnswer: 3,
  },
  {
    question: "Who is credited with inventing the telephone?",
    options: [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Nikola Tesla",
      "Guglielmo Marconi",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Gobi", "Sahara", "Antarctic Desert", "Arabian Desert"],
    correctAnswer: 2,
  },
  {
    question: 'Which famous playwright wrote "Hamlet"?',
    options: [
      "Tennessee Williams",
      "Arthur Miller",
      "William Shakespeare",
      "Oscar Wilde",
    ],
    correctAnswer: 2,
  },
];

export default function Page() {
  const params = useParams();
  const quizType = (params?.type as string) || "no-timer";

  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(quizQuestions.length).fill(-1)
  );
  const [timerActive, setTimerActive] = useState(true);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    hasMountedRef.current = true;
    return () => {
      hasMountedRef.current = false;
    };
  }, []);

  const calculateScore = () => {
    return userAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

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
    const score = calculateScore();
    router.push(`/thank-you?score=${score}&total=${quizQuestions.length}`);
  };

  const handleTimeUp = () => {
    // Prevent duplicate redirects
    if (timerActive && hasMountedRef.current) {
      setTimerActive(false);
      const score = calculateScore();
      // Use setTimeout to move router.push outside the render cycle
      setTimeout(() => {
        if (hasMountedRef.current) {
          router.push(
            `/thank-you?score=${score}&total=${quizQuestions.length}`
          );
        }
      }, 0);
    }
  };

  const renderTimer = () => {
    if (!timerActive) return null;

    switch (quizType) {
      case "digital-timer":
        return <DigitalTimer duration={600} onTimeUp={handleTimeUp} />;
      case "analogue-timer":
        return <AnalogueTimer duration={600} onTimeUp={handleTimeUp} />;
      default:
        setTimeout(handleTimeUp, 600000); // 10 minutes in milliseconds
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
          className="px-4 py-2 bg-gray-50 text-gray-50 rounded-md hover:bg-gray-100 hover:text-gray-100 transition-colors border-0 opacity-0"
          aria-label="Back to Selection"
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
}
