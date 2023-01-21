import {useCallback, useEffect, useState} from "react";
import "./Timer.scss"

const Timer = ({initialTime}) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [intervalId, setIntervalId] = useState(null);
    const [isTimerOn, setIsTimerOn] = useState(true);
    useEffect(() => {
        if (isTimerOn && timeLeft === 0) {
            alert("You missed the last rocket to mars!");
            clearInterval(intervalId);
            setIsTimerOn(false);
        }
    }, [timeLeft, intervalId]);

    const startTimer = useCallback(() => {
        if (!intervalId) {
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    }, [intervalId, isTimerOn]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalId);
    }, [timeLeft, startTimer, intervalId]);

    const resetTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setTimeLeft(initialTime);
        setIsTimerOn(true);
    };

    const formattedTimeLeft = timeLeft => {
        if (isTimerOn) {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
