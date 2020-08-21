import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ArtistQuestionScreen } from '../artist-question-screen';

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
    },
    renderPlayer: jest.fn()
};

describe(`Test button clicks on input elements`, () => {
    it(`click on first input is correct`, () => {
        const onAnswer = jest.fn();
        const artistQuestionScreen = shallow(
            <ArtistQuestionScreen onAnswer={onAnswer} question={mock.question} renderPlayer={mock.renderPlayer} />
        );

        const input = artistQuestionScreen.find(`input`).at(0);
        input.simulate(`click`);
    
        expect(onAnswer).toBeCalledTimes(1);
    });
});