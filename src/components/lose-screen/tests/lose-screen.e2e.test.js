import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoseScreen } from '../lose-screen';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2) => shallow(
    <LoseScreen endTime={prop1} reset={prop2} />
);

const mock = {
    endTime: false,
    reset: jest.fn()
};

describe(`LoseScreen component`, () => {
    let component;
    const reset = jest.fn();

    beforeEach(() => {
        component = setUp(mock.endTime, reset);
    });

    it(`reset click is realize`, () => {    
        const tryAgainButton = component.find(`Link`);
        tryAgainButton.simulate(`click`);
    
        expect(reset).toHaveBeenCalledTimes(1);
    });
});