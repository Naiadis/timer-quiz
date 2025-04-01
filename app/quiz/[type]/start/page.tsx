"use client";

import { useRouter, useParams } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const params = useParams();
  const quizType = params?.type as string;

  const handleStart = () => {
    router.push(`/quiz/${quizType}/questions`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <button
        onClick={handleStart}
        className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-lg font-semibold"
      >
        Start
      </button>
    </main>
  );
}
