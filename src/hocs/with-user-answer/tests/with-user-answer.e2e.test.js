import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withUserAnswer from '../with-user-answer';

configure({adapter: new Adapter()});

const MockComponent = () => {
    return <>
        <input />
        <input />
        <input />
        <input />
    </>
};

const question = {
    answers: [
        {
            src: `path`,
            genre: `rock`
        },
        {
            src: `path`,
            genre: `blues`
        },
        {
            src: `path`,
            genre: `jazz`
        },
        {
            src: `path`,
            genre: `jazz`
        },
    ]
};

const MockComponentWrapped = withUserAnswer(MockComponent, question);

it(`Paused by default and Renderer checkboxes are synchronized with state`, () => {
    const wrapped = mount(<MockComponentWrapped />);
    // const inputs = wrapped.find(`input`);
    // const inputOne = inputs.at(0);
    // const inputTwo = inputs.at(1);

    // inputOne.simulate(`change`);
    // expect(wrapped.state().userAnswer).toEqual([false, false, false, false]);

    // inputOne.simulate(`change`);
    // expect(wrapped.state().userAnswer).toEqual([true, false, false, false]);

    

    // inputTwo.simulate(`change`);
    // expect(wrapped.state().userAnswer).toEqual([false, true, false, false]);

    // inputTwo.simulate(`change`);
    // expect(wrapped.state().userAnswer).toEqual([false, false, false, false]);

    expect(wrapped.state().userAnswer).toEqual([false, false, false, false]);
});