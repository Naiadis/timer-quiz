"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function QuizRedirect() {
  const router = useRouter();
  const params = useParams();
  const quizType = params?.type as string;

  useEffect(() => {
    router.replace(`/quiz/${quizType}/start`);
  }, [quizType, router]);

  return null;
}
