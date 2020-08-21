import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { GenreQuestionScreen } from '../genre-question-screen';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1, prop2, prop3, prop4, prop5) => shallow(
    <GenreQuestionScreen question={prop1} onAnswer={prop2} renderPlayer={prop3} getUserAnswer={prop4} userAnswerArray={prop5} />
);

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
    },
    onAnswer: jest.fn(),
    renderPlayer: jest.fn(),
    getUserAnswer: jest.fn(),
    userAnswerArray: [false, false, false, false]
};

describe(`GenreQuestionScreen component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.question, mock.onAnswer, mock.renderPlayer, mock.getUserAnswer, mock.userAnswerArray);
    });

    it(`should contain section wrapper`, () => {
        const wrapper = component.find('.game');
        expect(wrapper.length).toBe(1);
    });

    it(`GenreQuestionScreen correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<GenreQuestionScreen 
                question={mock.question}
                onAnswer={mock.onAnswer}
                renderPlayer={mock.renderPlayer}
                getUserAnswer={mock.getUserAnswer}
                userAnswerArray={mock.userAnswerArray}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});