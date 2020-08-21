import React from 'react';
import { Link } from 'react-router-dom';

import './win-screen.css';
import '../authorization-screen/authorization-screen.css';

type WinScreenType = {
    isAuthorization: boolean, 
    mistakes: number,
    step: number,
    minutes: string | number,
    seconds: string | number,
    reset: () => any
};

export const WinScreen: React.FC<WinScreenType> = ({ isAuthorization, mistakes, step, minutes, seconds, reset }) => {
    let resMinutes = Number(minutes);
    if (seconds < 10) {
        seconds = Number(seconds);
    }

    return (
        <div id="result-success" className="result-success">
            <section className="result">
                <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
                <h2 className="result__title">Вы настоящий меломан!</h2>
                <p className="result__total">За {resMinutes} минуты и {seconds} секунд вы набрали { step } балла, совершив {mistakes} ошибки</p>
                { isAuthorization ? 
                    <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p> :
                    <> 
                        <p className="result__text">Хотите сравнить свой результат с предыдущими попытками?</p>
                        <p className="result__text">Представтесь!</p>
                        <form className="login_form" action="">
                            <p className="login_field">
                                <label className="login_label" htmlFor="name">Логин</label>
                                <input className="login_input" type="text" name="name" id="name" />
                            </p>
                            <p className="login_field">
                                <label className="login_label" htmlFor="password">Пароль</label>
                                <input className="login_input" type="text" name="password" id="password" />
                                <span className="login_error">Неверный пароль</span>
                            </p>
                            <Link to="/" onClick={reset} className="login_button button" type="submit">Войти</Link>
                        </form>
                    </>
                } 
                <Link to="/" className="result__replay" type="button" onClick={reset}>Сыграть ещё раз</Link>
            </section>
        </div>
    );
};