import {useCallback, useEffect, useState} from "react";
import "./Timer.scss";

const Timer = ({initialTime, id}) => {
    const savedTimeLeft = localStorage.getItem(`timer-${id}`);
    const [timeLeft, setTimeLeft] = useState(savedTimeLeft ? savedTimeLeft : initialTime);
    const [intervalId, setIntervalId] = useState(null);
    const [isTimerOn, setIsTimerOn] = useState(true);

    // Save the remaining time to local storage before the component unmounts
    useEffect(() => {
        return () => {
            if (timeLeft < 0) {
                localStorage.setItem(`timer-${id}`, 0);
                setIsTimerOn(false)
            } else {
                localStorage.setItem(`timer-${id}`, timeLeft);
            }
            if (isTimerOn && timeLeft === 0) {
                alert("You missed the last rocket to mars!");
                clearInterval(intervalId);
                setIsTimerOn(false);
            }
        };
    }, [timeLeft, id ]);

    // Start the timer
    const startTimer = useCallback(() => {
        if (!intervalId) {
            const newIntervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    }, [intervalId]);

    // Clear the interval when the component unmounts
    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalId);
    }, [timeLeft, startTimer, intervalId]);

    // Handle the reset button
    const resetTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setTimeLeft(initialTime);
        setIsTimerOn(true);
        localStorage.removeItem(`timer-${id}`);
    };

    const formattedTimeLeft = (timeLeft) => {
        if (isTimerOn && +timeLeft >= 0) {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        } else {
            return `0:00`;
        }
    };

    return (
        <div className="timer">
            <div className="time-left">
                <span className="time-num">{formattedTimeLeft(timeLeft).split(':')[0]}</span>
                :
                <span>{formattedTimeLeft(timeLeft).split(':')[1]}</span>
            </div>
            <div className="controls">
                <button onClick={resetTimer}>Reset timer</button>
            </div>
        </div>)
}

export default Timer;
