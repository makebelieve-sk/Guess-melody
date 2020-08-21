import React from 'react';
import { Link } from "react-router-dom";

import '../win-screen/win-screen.css';

type LoseScreenType = {
    endTime: boolean,
    reset: () => any
};

export const LoseScreen: React.FC<LoseScreenType> = ({ endTime, reset }) => {
    return (
        <div id="fail-tries" className="fail-tries">
            <section className="result">
                <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
                {!endTime ? (
                    <>
                        <h2 className="result__title">Какая жалость!</h2>
                        <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
                    </>
                ) : (
                    <>
                        <h2 className="result__title">Увы и ах!</h2>
                        <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
                    </>
                )}
                <Link to="/" className="result__replay" onClick={reset}>Попробовать ещё раз</Link>
            </section>
        </div>
    )
};