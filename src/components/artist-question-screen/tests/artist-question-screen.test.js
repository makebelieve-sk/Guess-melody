import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ArtistQuestionScreen } from '../artist-question-screen';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1, prop2, prop3) => shallow(<ArtistQuestionScreen question={prop1} onAnswer={prop2} renderPlayer={prop3} />);

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
    renderPlayer: jest.fn()
};

describe(`ArtistQuestionScreen component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.question, mock.renderPlayer, mock.onAnswer);
    });

    it(`should contain section wrapper`, () => {
        const wrapper = component.find('.section-wrapper');
        expect(wrapper.length).toBe(1);
    });

    it(`test call renderPlayer function`, () => {
        const renderPlayer = jest.fn();
        const artistQuestionScreen = shallow(
            <ArtistQuestionScreen renderPlayer={renderPlayer} question={mock.question} onAnswer={mock.onAnswer} />
        );

        expect(renderPlayer).toBeCalledTimes(1);
    });

    it(`ArtistQuestionScreen correctly renderer with them prop`, () => {
        const tree = renderer  
            .create(<ArtistQuestionScreen 
                question={mock.question}
                renderPlayer={mock.renderPlayer}
                onAnswer={mock.onAnswer}
            />)
            .toJSON();
    
        expect(tree).toMatchSnapshot();
    });
});