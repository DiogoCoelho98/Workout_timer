import { useState, memo, useEffect, useCallback } from "react";
import clickSound from "./ClickSound.m4a";
 
export default memo(function Calculator({ workouts, allowSound }) {
    const [number, setNumber] = useState(workouts.at(0).numExercises);
    const [sets, setSets] = useState(3);
    const [speed, setSpeed] = useState(90);
    const [durationBreak, setDurationBreak] = useState(5);
    const [duration, setDuration] = useState(0);

    const mins = Math.floor(duration);
    const seconds = (duration - mins) * 60;


    // Synchronization of duration state
    useEffect(() => {
        setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    }, [number, speed, sets, durationBreak]);

    useEffect(() => {
        const playSound = () => {
        if (!allowSound) return;

        const sound = new Audio(clickSound);
        sound.play();
    }
        playSound();
    }, [allowSound, duration])

    function handleIncrement() {
        setDuration(duration => duration + 1);
    }

    function handleDecrement() {
        setDuration(duration => duration > 1 ? duration - 1 : 0);
    }
    
    return(
        <>
            <form>

                <div>
                    <label>Type of Workout</label>
                    <select 
                        onChange={e => setNumber(Number(e.target.value))}
                        value={number}
                    >
                        {workouts.map(workout => (
                            <option 
                                key={workout.name}
                                value={workout.numExercises}
                                > 
                                    {workout.name} ({workout.numExercises} exercises)
                            </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label>How many sets?</label>
                    <input 
                        type="range" 
                        min={1}
                        max={5}
                        onChange={e => setSets(Number(e.target.value))}
                        value={sets}
                    />
                    <span>{sets} sets</span>
                </div>

                <div>
                    <label>How fast are you?</label>
                    <input
                        type='range'
                        min='30'
                        max='180'
                        step='30'
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                    <span>{speed} sec/exercise</span>
                </div>

                <div>
                    <label>Break length</label>
                    <input 
                        type="range" 
                        min={1}
                        max={10}
                        onChange={e => setDurationBreak(Number(e.target.value))}
                        value={durationBreak}
                    />
                    <span>{durationBreak} minutes/break</span>
                </div>          
            </form>

            <section>
                <button onClick={handleDecrement}>-</button>
                <p>
                    {mins < 10 && "0"}
                    {mins} : {seconds < 10 && "0"}
                    {seconds}
                </p>
                <button onClick={handleIncrement}>+</button>
            </section>
        </>
    )
})