import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import Controls from "./components/Controls/Controls";
import { useState } from "react";
import "./App.css";

let timerId = null;
let previousSessionType = null;

function applySessionBackground(type) {
  document.body.className = "";
  if (type === "work") {
    document.body.classList.add("work-session");
  } else if (type === "shortBreak") {
    document.body.classList.add("short-break");
  } else if (type === "longBreak") {
    document.body.classList.add("long-break");
  }
}

export default function App() {
  const workDuration = 0.1 * 60;
  const shortBreak = 0.1 * 60;
  const longBreak = 0.1 * 60;

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [isBeeping, setIsBeeping] = useState(false);

  // Apply background once per session change
  if (sessionType !== previousSessionType) {
    applySessionBackground(sessionType);
    previousSessionType = sessionType;
  }

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsRunning(false);
          triggerBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerId);
    stopBeep();
    setIsRunning(false);
    setTimeLeft(workDuration);
    setSessionType("work");
    setSessionCount(0);
    applySessionBackground("work");
  };

  const triggerBeep = () => {
    const alarm = document.getElementById("alarm");
    alarm.pause();
    alarm.currentTime = 0;
    setIsBeeping(true);

    alarm.play().catch((err) => {
      console.log("Audio play error: ", err);
    });
  };

  const stopBeep = () => {
    const alarm = document.getElementById("alarm");
    alarm.pause();
    alarm.currentTime = 0;
    setIsBeeping(false);
  };

  const continueToNextSession = () => {
    stopBeep();
    if (sessionType === "work") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (newCount % 4 === 0) {
        setSessionType("longBreak");
        setTimeLeft(longBreak);
      } else {
        setSessionType("shortBreak");
        setTimeLeft(shortBreak);
      }
    } else {
      setSessionType("work");
      setTimeLeft(workDuration);
    }
    startTimer();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="app-container">
      <h2 className="session-heading">
        Session:{" "}
        {sessionType === "work"
          ? "Work"
          : sessionType === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>

      <TimerDisplay minutes={minutes} seconds={seconds} />

      {!isBeeping && (
        <Controls
          isRunning={isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />
      )}

      {isBeeping && (
        <div className="beep-container">
          <p className="alarm-text">
            Alarm! Click to continue to the next session.
          </p>
          <button onClick={continueToNextSession}>
            Stop Alarm and Continue
          </button>
        </div>
      )}

      <p className="session-count">Completed Sessions: {sessionCount}</p>

      <audio id="alarm" src="/alarm.mp3" preload="auto"></audio>
    </div>
  );
}
