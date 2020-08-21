import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { GenreQuestionScreen } from '../genre-question-screen';

configure({adapter: new Adapter()});

const mock = {
    question: {
        song: {
            artist: `John Snow`,
            src: `https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3`
        },
        answers: [
            {
                id: 1,
                picture: `https://placehold.it/134x134`,
                artist: 'John Snow'
            },
            {
                id: 2,
                picture: `https://placehold.it/134x134`,
                artist: 'Jack Daniels'
            },
            {
                id: 3,
                picture: `https://placehold.it/134x134`,
                artist: 'Jim Beam'
            }
        ]
    }
};

describe(`GenreQuestionScreen component`,() => {
    it(`submit is realize`, () => {
        const { question } = mock;
        const onAnswer = jest.fn();
        const renderPlayer = jest.fn();
        const getUserAnswer = jest.fn();
    
        const genreQuestionScreen = shallow(<GenreQuestionScreen 
            question={question}
            onAnswer={onAnswer}
            renderPlayer={renderPlayer}
            getUserAnswer={getUserAnswer}
            userAnswerArray={[false, false, false, false]}
        />);
    
        const form = genreQuestionScreen.find(`form`);
        const formSendPrevention = jest.fn();
        form.simulate(`submit`, {
            preventDefault: formSendPrevention
        });
    
        expect(onAnswer).toHaveBeenCalledTimes(1);
        expect(formSendPrevention).toHaveBeenCalledTimes(1);
    });
});