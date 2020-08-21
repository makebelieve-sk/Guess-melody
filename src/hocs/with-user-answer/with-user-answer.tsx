import React, { PureComponent } from 'react';
import { Subtract } from "utility-types";

import { questionType, userAnswerType, isGenreAnswerType } from '../../types';

type InjectedProps = {
    renderPlayer: () => any
};

const withUserAnswer = (Component, question: questionType) => {
    type P = React.ComponentProps<typeof Component>;
    type T = Subtract<P, InjectedProps>;

    class WithUserAnswer extends PureComponent<T, userAnswerType> {
        constructor(props: T) {
            super(props);

            this.state = {
                userAnswer: new Array(question.answers.length).fill(false)
            };
        };

        render() {
            return <Component
                {...this.props}
                userAnswerArray = {this.state.userAnswer}
                getUserAnswer={(answer: isGenreAnswerType, i: number) => {
                    return (
                        <div className="game_answer">
                            <input 
                                checked={this.state.userAnswer[i]}
                                className="game_input" 
                                type="checkbox" 
                                name="answer" 
                                id={`answer-${answer.id}`}
                                onChange={() => {
                                    const userAnswer = [...this.state.userAnswer];
                                    userAnswer[i] = !userAnswer[i];
                                    this.setState({
                                        userAnswer: userAnswer
                                    });
                                }}
                            />
                            <label 
                                className="game_check" 
                                htmlFor={`answer-${answer.id}`} 
                            />
                        </div>
                    );
                }} 
            />
        }
    };

    return WithUserAnswer;
};

export default withUserAnswer;