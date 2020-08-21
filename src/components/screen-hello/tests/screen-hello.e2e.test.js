import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ScreenHello } from '../screen-hello';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2, prop3) => shallow(
    <ScreenHello time={prop1} mistakes={prop2} onStartButtonClick={prop3} />
);

const mock = {
    time: 0,
    mistakes: 0,
    onStartButtonClick: jest.fn()
};

describe(`ScreenHello component`, () => {
    let component;
    const clickHandler = jest.fn();

    beforeEach(() => {
        component = setUp(mock.time, mock.mistakes, clickHandler);
    });

    it(`click is realize`, () => {
        const startButton = component.find(`button`);
        startButton.simulate(`click`);
    
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });
});