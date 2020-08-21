import React from 'react';

import './mistakes.css';

type MistakesType = {
    mistakes: number
};

export const Mistakes: React.FC<MistakesType> = ({ mistakes }) => {

    switch(mistakes) {
        case 0: 
            return (
                <div className="game_mistakes">
                    <div className="wrong"></div>
                    <div className="wrong"></div>
                    <div className="wrong"></div>
                </div>
            );
        case 1: 
            return (
                <div className="game_mistakes">
                    <div className="wrong"></div>
                    <div className="wrong"></div>
                    <div className="wrong-active"></div>
                </div>
            );
        case 2: 
            return (
                <div className="game_mistakes">
                    <div className="wrong"></div>
                    <div className="wrong-active"></div>
                    <div className="wrong-active"></div>
                </div>
            );
        case 3: 
            return (
                <div className="game_mistakes">
                    <div className="wrong-active"></div>
                    <div className="wrong-active"></div>
                    <div className="wrong-active"></div>
                </div>
            );
        default:
            return (
                <div className="game_mistakes">
                    <div className="wrong"></div>
                    <div className="wrong"></div>
                    <div className="wrong"></div>
                </div>
            );
    }
};