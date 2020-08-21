import React from 'react';

import { questionType, isArtistAnswerType, userAnswerType, isGenreAnswerType } from '../../types';

import './artist-question-screen.css';

type ArtistQuestionScreenType = {
    question: questionType,
    onAnswer: (userAnswerArray: isArtistAnswerType | userAnswerType) => any,
    renderPlayer: (answer: isGenreAnswerType | string, i: number) => any
};

export const ArtistQuestionScreen: React.FC<ArtistQuestionScreenType> = ({ question, onAnswer, renderPlayer }) => {
    const { answers, song } = question;

    return (
        <section className="section-wrapper">
            <section className="game_screen">
                <h2 className="game_title">Кто исполняет эту песню?</h2>
                <div className="game_track">
                    {renderPlayer(song, 0)}
                </div>
                <form className="game_artist">
                    {answers.map((answer: any) => {
                        return (
                            <div className="artist" key={`answer-${answer.id}`}>
                                <input 
                                    className="artist_input visually-hidden" 
                                    type="radio" 
                                    name="answer" 
                                    value={`answer-${answer.id}`} 
                                    id={`answer-${answer.id}`} 
                                    onClick={() => onAnswer(answer)}
                                />
                                <label className="artist_name" htmlFor={`answer-${answer.id}`}>
                                    <img className="artist_picture" src={answer.picture} alt={answer.artist} />
                                    {answer.artist}
                                </label>
                            </div>
                        );
                    })}
                </form>
            </section>
        </section>
    );
};