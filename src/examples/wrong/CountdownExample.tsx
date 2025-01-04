import React, { useState, useEffect, useMemo } from "react";

const DEFAULT_TIMER = 10 * 1000;

export const CountdownExample: React.FC = () => {
  const [startAt, setStartAt] = useState<number>();
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [isPaused, setIsPaused] = useState(false);

  const now = useNow(!!startAt && !isPaused, 50, () => {
    if (isTimeUp) {
      setTimer(0);
      setStartAt(undefined);
    }
  });

  const { isRunning, timeLeft, isTimeUp } = (() => {
    if (startAt) {
      const timeLeft = useNow.calculateCountdown(now, startAt, timer);
      const isTimeUp = timeLeft === 0;

      return {
        isRunning: !isTimeUp,
        isTimeUp,
        timeLeft,
      };
    }

    return {
      isRunning: false,
      isTimeUp: timer === 0,
      timeLeft: timer,
    };
  })();

  const handleStart = () => {
    setStartAt(Date.now());
    setIsPaused(false);
  };

  const handlePause = () => {
    setStartAt(undefined);
    setIsPaused(true);
    setTimer(timeLeft);
  };

  const handleReset = () => {
    setStartAt(undefined);
    setTimer(DEFAULT_TIMER);
  };

  const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = milliseconds % 1000;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wrong Countdown Implementation</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontFamily: "monospace",
            fontWeight: "bold",
            color: timeLeft <= 10 ? "#dc2626" : "#1f2937",
          }}
        >
          {formatTime(timeLeft)}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {!isRunning ? (
            <button
              onClick={handleStart}
              style={{
                padding: "8px 16px",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              style={{
                padding: "8px 16px",
                backgroundColor: "#eab308",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {timeLeft === 0 && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Time's up!
          </div>
        )}
      </div>
    </div>
  );
};

function useNow(
  enabled: boolean,
  interval: number,
  onTimeChange?: (now: number) => void
) {
  const onTimeChangeRef = React.useRef(onTimeChange);
  onTimeChangeRef.current = onTimeChange;
  const [now, setNow] = useState<number>();
  useEffect(() => {
    if (!enabled) {
      setNow(undefined);
      return;
    }
    const intervalId = setInterval(() => {
      setNow(Date.now());
      onTimeChangeRef.current?.(Date.now());
    }, interval);
    return () => clearInterval(intervalId);
  }, [enabled, interval]);
  return now ?? Date.now();
}

useNow.calculateCountdown = (now: number, startAt: number, timer: number) => {
  return Math.max(timer - (now - startAt), 0);
};

useNow.calculateTimer = (now: number, startAt: number) => {
  return now - startAt;
};
