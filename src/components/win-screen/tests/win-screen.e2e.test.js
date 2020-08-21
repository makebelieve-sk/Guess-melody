import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { WinScreen } from '../win-screen';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2, prop3, prop4, prop5, prop6) => shallow(
    <WinScreen isAuthorization={prop1} mistakes={prop2} step={prop3} minutes={prop4} seconds={prop5} reset={prop6} />
);

const mock = {
    isAuthorization: false, 
    mistakes: 0,
    step: 0,
    minutes: '01',
    seconds: '01',
    reset: jest.fn()
};

describe(`WinScreen component`, () => {
    let component;
    const reset = jest.fn();

    beforeEach(() => {
        component = setUp(mock.isAuthorization, mock.mistakes, mock.step, mock.timeEnd, mock.seconds, reset);
    });

    it(`reset click is realize`, () => {    
        const tryAgainButton = component.find(`.result__replay`);
        tryAgainButton.simulate(`click`);
    
        expect(reset).toHaveBeenCalledTimes(1);
    });
});