import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Header } from '../header';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2, prop3, prop4, prop5) => shallow(
    <Header onBack={prop1} onHome={prop2} mistakes={prop3} timeEnd={prop4} getWinTime={prop5} />
);

const mock = {
    onBack: jest.fn(),
    onHome: jest.fn(),
    mistakes: 1,
    timeEnd: jest.fn(),
    getWinTime: jest.fn()
};

describe(`Header component`, () => {
    let component;
    const clickHandlerButton = jest.fn();
    const clickHandlerI = jest.fn();

    beforeEach(() => {
        component = setUp(clickHandlerButton, clickHandlerI, mock.mistakes, mock.timeEnd, mock.getWinTime);
    });

    it(`back click is realize`, () => {    
        const backButton = component.find(`button`);
        backButton.simulate(`click`);
    
        expect(clickHandlerButton).toHaveBeenCalledTimes(1);
    });

    it(`back click is realize`, () => {
        const homeButton = component.find(`i`);
        homeButton.simulate(`click`);
    
        expect(clickHandlerI).toHaveBeenCalledTimes(1);
    });
});