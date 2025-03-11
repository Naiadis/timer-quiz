"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [score, setScore] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    const scoreParam = searchParams.get("score")
    const totalParam = searchParams.get("total")

    if (scoreParam) setScore(Number.parseInt(scoreParam))
    if (totalParam) setTotal(Number.parseInt(totalParam))
  }, [searchParams])

  const getPercentage = () => {
    if (score === null || total === null || total === 0) return 0
    return Math.round((score / total) * 100)
  }

  const getGrade = () => {
    const percentage = getPercentage()
    if (percentage >= 90) return "Excellent"
    if (percentage >= 80) return "Very Good"
    if (percentage >= 70) return "Good"
    if (percentage >= 60) return "Satisfactory"
    return "Needs Improvement"
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>

        {score !== null && total !== null ? (
          <>
            <div className="mb-6">
              <div className="text-5xl font-bold mb-2 text-primary">
                {score} / {total}
              </div>
              <div className="text-xl text-gray-600">{getPercentage()}%</div>
              <div className="mt-2 text-lg font-medium">{getGrade()}</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${getPercentage()}%` }}></div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mb-6">Loading results...</p>
        )}

        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-gray-50 text-gray-50 rounded-md hover:bg-gray-50 transition-colors border-0"
        >
          Back to Home
        </button>
      </div>
    </main>
  )
}

