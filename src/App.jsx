import { useState, useEffect, useMemo } from "react";
import Calculator from "./Calculator.jsx";
import ToggleSounds from "./ToggleSounds.jsx";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // Slices the end of the format "Aug 24, 04:04:55 PM" -> AM/PM
  const partOfDay = time.slice(-2);

  // Every time that <App /> is re-rendered workouts[] is created again and that triggers re-renders of the child components
  const workouts = useMemo(() => {
    return [
      {
       name: "Full-body workout",
       numExercises: partOfDay === "AM" ? 9 : 8 
      },
      {
        name: "Arms + Legs",
        numExercises: 6
      },
      {
        name: "Arms only",
        numExercises: 3 
      },
      {
        name: "Legs only",
        numExercises: 4
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4
      }
    ];
  }, [partOfDay]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000)

    return function () {
      return clearInterval(id);
    }
  }, []);

  return(
    <>
      <main>
        <h1>Workout Timer</h1>
        <time>For your workout on {time}</time>
        <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound}/>
        <Calculator workouts={workouts} allowSound={allowSound}/>
      </main>
    </>
  )
}