import React from 'react';

import Timer from '../timer/timer';
import { Mistakes } from '../mistakes/mistakes';
import './header.css';

type HeaderType = {
    onBack: () => any,
    onHome: () => any,
    mistakes: number,
    timeEnd: () => any,
    getWinTime: (min: string, sec: string) => any
};

export const Header: React.FC<HeaderType> = ({ onBack, onHome, mistakes, timeEnd, getWinTime }) => {
    return (
        <header className="game_header">
            <div className="wrapper-logo">
                <button className="button-back" onClick={() => onBack()}/>
                <i className="welcome_logo_header" onClick={() => onHome()}/>
            </div>
            <Timer timeEnd={timeEnd} getWinTime={getWinTime} />
            <Mistakes mistakes={mistakes}/>
        </header>
    );
};