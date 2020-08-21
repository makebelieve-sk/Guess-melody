import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AuthorizationScreen } from '../authorization-screen';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => shallow(<AuthorizationScreen />);

describe(`AuthorizationScreen component`, () => {
    let component;

    beforeEach(() => {
        component = setUp();
    });

    it(`should contain section wrapper`, () => {
        const wrapper = component.find('.login');
        expect(wrapper.length).toBe(1);
    });

    it(`AuthorizationScreen correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<AuthorizationScreen />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
