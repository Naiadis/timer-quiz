"use client"

import { useState, useEffect } from "react"

interface DigitalTimerProps {
  duration: number // in seconds
}

export default function DigitalTimer({ duration }: DigitalTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    let formattedTime = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`

    if (hours > 0) {
      formattedTime = `${hours.toString().padStart(2, "0")}:${formattedTime}`
    }

    return formattedTime
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
      <div className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</div>
    </div>
  )
}

