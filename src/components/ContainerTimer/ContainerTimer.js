import React from 'react';
import './ContainerTimer.scss';

import Timer from "../Timer/Timer";
import hero from "../../assets/images/hero.png"
import rocket from "../../assets/images/rocket.png"

const ContainerTimer = () => {
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
                        <Timer initialTime={3 * 60} id={"time_1"}/>
                    </div>
                    <div className="timer">
                        <Timer initialTime={4 * 60} id={"time_2"}/>
                    </div>
                    <div className="timer">
                        <Timer initialTime={5 * 60} id={"time_3"}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContainerTimer;
