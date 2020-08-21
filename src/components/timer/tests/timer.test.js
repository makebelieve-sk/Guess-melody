import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Timer from '../timer';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1, prop2) => shallow(
    <Timer getWinTime={prop1} timeEnd={prop2} />
);

const mock = {
    getWinTime: jest.fn(),
    timeEnd: jest.fn()
};

describe(`Timer component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.getWinTime, mock.timeEnd);
    });

    it(`should contain div wrapper`, () => {
        const wrapper = component.find('.timer_value');
        expect(wrapper.length).toBe(1);
    });

    it(`Timer correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<Timer 
                getWinTime={mock.getWinTime}
                timeEnd={mock.timeEnd}
            />)
            .toJSON();
    
        expect(tree).toMatchSnapshot();
    });
});

