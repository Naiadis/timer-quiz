"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ThankYouPage() {
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

  const handleSeeResults = () => {
    if (score !== null && total !== null) {
      router.push(`/results?score=${score}&total=${total}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Participating</h1>

        <p className="text-gray-600 mb-8">
          Your quiz has been submitted successfully. We appreciate your time and effort.
        </p>
      </div>

      {/* Hidden button - positioned below the box */}
      <button
        onClick={handleSeeResults}
        className="px-6 py-2 bg-gray-50 text-gray-50 rounded-md border-0 w-full max-w-md mt-8"
        aria-label="See Results"
      >
        See Results
      </button>
    </main>
  )
}

