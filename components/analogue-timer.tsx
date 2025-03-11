"use client"

import { useState, useEffect } from "react"

interface AnalogueTimerProps {
  duration: number // in seconds
}

export default function AnalogueTimer({ duration }: AnalogueTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const size = 60 // size of the clock in pixels
  const radius = size / 2
  const center = radius
  const totalMinutes = Math.ceil(duration / 60)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Calculate the angle for the hand based on time left
  const angle = (timeLeft / duration) * 360

  // Calculate the coordinates for the hand
  const handX = center + radius * 0.8 * Math.sin((angle * Math.PI) / 180)
  const handY = center - radius * 0.8 * Math.cos((angle * Math.PI) / 180)

  // Generate clock numbers (simplified)
  const clockNumbers = []
  for (let i = 0; i < 4; i++) {
    const numberAngle = (i * 90 * Math.PI) / 180
    const numberX = center + radius * 0.7 * Math.sin(numberAngle)
    const numberY = center - radius * 0.7 * Math.cos(numberAngle)

    // Convert clock position to minutes (for a 20-minute clock)
    const minuteValue = Math.round((i / 12) * totalMinutes)

    clockNumbers.push(
      <text key={i} x={numberX} y={numberY + 4} textAnchor="middle" fontSize="8">
        {minuteValue}
      </text>,
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-full p-1 shadow-sm">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock face */}
        <circle cx={center} cy={center} r={radius - 2} fill="white" stroke="#e5e7eb" strokeWidth="1" />

        {/* Clock numbers */}
        {clockNumbers}

        {/* Clock hand */}
        <line x1={center} y1={center} x2={handX} y2={handY} stroke="black" strokeWidth="2" strokeLinecap="round" />

        {/* Center dot */}
        <circle cx={center} cy={center} r="2" fill="black" />
      </svg>
    </div>
  )
}

