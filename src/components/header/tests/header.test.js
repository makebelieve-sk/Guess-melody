import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Header } from '../header';

Enzyme.configure({ adapter: new Adapter() });

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

    beforeEach(() => {
        component = setUp(mock.onBack, mock.onHome, mock.mistakes, mock.timeEnd, mock.getWinTime);
    });

    it(`should contain header wrapper`, () => {
        const wrapper = component.find('.game_header');
        expect(wrapper.length).toBe(1);
    });

    it(`Header correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<Header 
                onBack={mock.onBack}
                onHome={mock.onHome}
                mistakes={mock.mistakes}
                timeEnd={mock.timeEnd}
                getWinTime={mock.getWinTime}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});