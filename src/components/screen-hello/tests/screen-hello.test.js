import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ScreenHello } from '../screen-hello';

Enzyme.configure({ adapter: new Adapter() });

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

    beforeEach(() => {
        component = setUp(mock.time, mock.mistakes, mock.onStartButtonClick);
    });

    it(`should contain div wrapper`, () => {
        const wrapper = component.find('.welcome');
        expect(wrapper.length).toBe(1);
    });

    it(`ScreenHello correctly renders after relaunch`, () => {
        const tree = renderer
            .create(<ScreenHello
                time={mock.time}
                mistakes={mock.mistakes}
                onStartButtonClick={mock.onStartButtonClick}
            />)
            .toJSON();
    
        expect(tree).toMatchSnapshot();
    });
});