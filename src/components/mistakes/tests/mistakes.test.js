import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Mistakes } from '../mistakes';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1) => shallow(
    <Mistakes mistakes={prop1} />
);

const mock = {
    mistakes: 0
};

describe(`Mistakes component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.mistakes);
    });

    it(`should contain div wrapper`, () => {
        const wrapper = component.find('.game_mistakes');
        expect(wrapper.length).toBe(1);
    });

    it(`Mistakes correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<Mistakes 
                mistakes={mock.mistakes}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});