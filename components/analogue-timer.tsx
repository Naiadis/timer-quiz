"use client";

import { useEffect, useRef, useState } from "react";

interface AnalogueTimerProps {
  duration: number;
  onTimeUp: () => void;
}

export default function AnalogueTimer({
  duration,
  onTimeUp,
}: AnalogueTimerProps) {
  const canvasRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeUpCallbackRef = useRef(onTimeUp);

  // Update the callback ref if it changes
  useEffect(() => {
    timeUpCallbackRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    // Only start the timer if it's running and we have time remaining
    if (!isRunning || timeRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Clear the interval
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          // Use setTimeout to safely call the time up callback
          setTimeout(() => {
            setIsRunning(false);
            timeUpCallbackRef.current();
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function to clear interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#3b4f6b";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw minute markers and numbers
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#3b4f6b";

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 - Math.PI / 2;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;

      if (i % 5 === 0) {
        // Draw numbers with swapped positions
        const numberX = centerX + Math.cos(angle) * (radius * 0.8);
        const numberY = centerY + Math.sin(angle) * (radius * 0.8);

        // Determine the swapped number
        let displayNumber = i;
        if (i !== 0 && i !== 30) {
          displayNumber = (60 - i) % 60;
        }

        ctx.fillText(displayNumber.toString(), numberX, numberY);

        // Longer tick for 5-minute intervals
        const x2 = centerX + Math.cos(angle) * (radius * 0.9);
        const y2 = centerY + Math.sin(angle) * (radius * 0.9);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Shorter tick for 1-minute intervals
        const x2 = centerX + Math.cos(angle) * (radius * 0.95);
        const y2 = centerY + Math.sin(angle) * (radius * 0.95);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Calculate angles for the pie
    const fixedStartAngle = (Math.PI * 2 * 50) / 60 - Math.PI / 2; // 50-minute mark (adjusted for 10 min timer)
    const endAngle = -Math.PI / 2; // 0-minute mark (top)

    // Calculate the current start angle based on time remaining
    const progress = 1 - timeRemaining / duration;

    // As time passes, this progressively moves the start angle from 50-minute mark toward 0-minute mark
    const currentStartAngle =
      fixedStartAngle + progress * (endAngle + Math.PI * 2 - fixedStartAngle);

    // Draw the pie (filled area)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      currentStartAngle,
      endAngle + Math.PI * 2
    );
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = "rgba(180, 190, 210, 0.6)";
    ctx.fill();
  }, [timeRemaining, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-square">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
