import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Quiz Selection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Link
          href="/quiz/no-timer"
          className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 h-40"
        >
          <h2 className="text-xl font-semibold text-center">No Timer Quiz</h2>
        </Link>

        <Link
          href="/quiz/digital-timer"
          className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 h-40"
        >
          <h2 className="text-xl font-semibold text-center">Digital Timer Quiz</h2>
        </Link>

        <Link
          href="/quiz/analogue-timer"
          className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 h-40"
        >
          <h2 className="text-xl font-semibold text-center">Analogue Timer Quiz</h2>
        </Link>
      </div>
    </main>
  )
}

