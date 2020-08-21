import React from 'react';

import { isArtistAnswerType, userAnswerType, questionType, isGenreAnswerType } from '../../types';

import './genre-question-screen.css';

type GenreQuestionScreenType = {
    question: questionType,
    onAnswer: (userAnswerArray: any) => any,
    renderPlayer: (answer: isGenreAnswerType, i: number) => any,
    getUserAnswer: (answer: isGenreAnswerType, i: number) => any,
    userAnswerArray: isArtistAnswerType | userAnswerType
};

export const GenreQuestionScreen: React.FC<GenreQuestionScreenType> = ({ question, onAnswer, renderPlayer, getUserAnswer, userAnswerArray }) => {
    const { genre, answers } = question;

    return (
        <section className="game">
            <section className="game_screen">
                <h2 className="game_title">Выберите { genre } треки:</h2>
                <form className="game_tracks" onSubmit={(e) => {
                    e.preventDefault();
                    onAnswer(userAnswerArray);
                }}>
                    {answers.map((answer, i) => {
                        return (
                            <div className="game_track" key={`answer-${answer.id}`}>
                                {renderPlayer(answer, i)}
                                {getUserAnswer(answer, i)}
                            </div>
                        );
                    })}
                    <button className="game_submit button" type="submit">Ответить</button>
                </form>
            </section>
        </section>
    );
};