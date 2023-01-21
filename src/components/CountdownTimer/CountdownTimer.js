import React, {useState, useEffect, useCallback} from 'react';
import './CountdownTimer.scss';

import hero from "../../assets/images/hero.png"
import rocket from "../../assets/images/rocket.png"
import Timer from "../Timer/Timer";

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const [intervalId, setIntervalId] = useState(null);
    const [isTimerOn, setIsTimerOn] = useState(true);

    useEffect(() => {
        if (isTimerOn && timeLeft === 0) {
            alert("You missed the last rocket to mars!");
            setIsTimerOn(false)
            clearInterval(intervalId);
        }
    }, [timeLeft, intervalId]);

    const startTimer = useCallback(() => {
        if (!intervalId) {
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    }, [intervalId]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalId);
    }, [timeLeft, startTimer, intervalId]);

    const resetTimer = () => {
        setIsTimerOn(true)
        clearInterval(intervalId);
        setIntervalId(null);
        setTimeLeft(5 * 60);
    };

    return (<>
            <div className="countdown-timer">
                <div className="new-section">
                    <img src={rocket} alt="new section image"/>
                </div>
                <div className="countdown-section">
                    <div className="description-text">
                        <h1>Get your seat to mars</h1>
                        <p>Earth is doomed, nut don't worry!The last rocket is leaving for mars soon, so hurry up and
                            book your flight!</p>
                    </div>
                    <div className="image-container">
                        <img src={hero} alt="countdown section image"/>
                    </div>
                </div>

                <div className="countdown-text">Countdown to lift off</div>
                <div className="timers-container">
                    <div className="timer">
                        <Timer initialTime={3 * 60} />
                    </div>
                    <div className="timer">
                        <Timer initialTime={4 * 60} />
                    </div>
                    <div className="timer">
                        <Timer initialTime={5 * 60} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountdownTimer;
