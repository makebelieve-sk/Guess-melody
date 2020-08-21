import React from 'react';

import './screen-hello.css';

type ScreenHelloType = {
    time: number,
    mistakes: number,
    onStartButtonClick: () => any
};

export const ScreenHello: React.FC<ScreenHelloType> = ({ time, mistakes, onStartButtonClick }) => {
    return (
        <div className="welcome">
            <i className="welcome_logo"/>
            <button className="welcome_button" onClick={onStartButtonClick} />
            <h1 className="welcome_rules-title">Правила игры</h1>
            <p className="welcome_text">Правила просты:</p>
            <ul className="ul-list"> 
                <li className="welcome_rules-list">За { time } минут нужно ответить на все вопросы.</li>
                <li className="welcome_rules-list">Можно допустить { mistakes } ошибки.</li> 
            </ul>
            <p className="welcome_text">Удачи!</p>
        </div>
    );
};